# python-貪吃蛇遊戲(精簡版)
import pygame, random

SCREEN_SIZE = [800, 600]
WHITE = (255, 255, 255)

CELL_RADIUS = 20
SNAKE_COLOR = (0, 0, 0)

FOOD_COLOR = (0, 100, 0)
FOOD_RADIUS = 20

UPDATE = pygame.USEREVENT + 1
FOOD = pygame.USEREVENT + 2

LIGHT_GREY = (100, 100, 100)
MSG_POSITION = (200, 350)


def init_game():
    pygame.init()  # 初始化遊戲
    pygame.display.set_caption("貪吃蛇遊戲")  # 初始化標題
    pygame.time.set_timer(UPDATE, 500)  # 每0.15秒更新一次
    pygame.time.set_timer(FOOD, 1500)  # 每3秒生成食物


class Game:
    def __init__(self):
        self.running = True  # 啟動變數
        self.screen = pygame.display.set_mode(SCREEN_SIZE)  # 初始化視窗大小
        self.snake = Snake()
        self.food = None
        self.message = None


class Cell:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def to_tuple(self):
        return self.x, self.y

    def copy(self):
        return Cell(self.x, self.y)

    # 更新蛇運行的方向
    def update(self, direction):
        if direction == "U":
            self.y -= CELL_RADIUS * 2
        elif direction == "D":
            self.y += CELL_RADIUS * 2
        elif direction == "L":
            self.x -= CELL_RADIUS * 2
        elif direction == "R":
            self.x += CELL_RADIUS * 2


class Snake:
    def __init__(self):
        # 初始蛇的位置
        cell_diameter = CELL_RADIUS * 2  # 蛇的半徑*2=蛇的直徑
        x = (SCREEN_SIZE[0] / cell_diameter // 2) * cell_diameter
        y = (SCREEN_SIZE[1] / cell_diameter // 2) * cell_diameter

        self.body = [Cell(x, y)]
        self.cell_size = CELL_RADIUS
        self.color = SNAKE_COLOR
        self.direction = "L"  # 初始蛇運行的方向

    def update(self):
        head = self.body[0].copy()  # 貪吃蛇的頭
        self.body.pop()
        head.update(self.direction)
        self.body.insert(0, head)


# 蛇和食物碰撞後吃掉
def is_snake_food_collide():
    head = game.snake.body[0].copy()
    head.update(game.snake.direction)

    return (game.food[0] - head.x) == 0 and (
        game.food[1] - head.y
    ) == 0  # 食物座標與貪吃蛇的頭座標相同


def update():
    check_snake_dir()
    check_food()
    check_head_body_collision()
    check_out_boundary()
    check_win()

    for event in pygame.event.get():
        if event.type == pygame.QUIT:  # 判斷結束遊戲
            game.running = False
        if event.type == UPDATE:  # 蛇更新
            game.snake.update()
        if event.type == FOOD:  # 食物更新
            generate_food()


def check_win():
    length = len(game.snake.body)
    cell_diameter = CELL_RADIUS * 2
    max_cell_x = SCREEN_SIZE[0] // cell_diameter
    max_cell_y = SCREEN_SIZE[1] // cell_diameter

    if length == max_cell_x * max_cell_y:
        game.running = False
        game.message = "You Win the game. Should restart? F5(y)/F1(n)"


# 檢查身體超出邊界，遊戲結束
def check_out_boundary():
    cell_diameter = 2 * CELL_RADIUS
    out_boundary_x_cells = [
        cell
        for cell in game.snake.body
        if cell.x < cell_diameter or cell.x > SCREEN_SIZE[0] - cell_diameter
    ]
    out_boundary_y_cells = [
        cell
        for cell in game.snake.body
        if cell.y < cell_diameter or cell.y > SCREEN_SIZE[1] - cell_diameter
    ]

    if len(out_boundary_x_cells) > 0 or len(out_boundary_y_cells) > 0:
        game.running = False
        game.message = "Snake is out of boundary. Should restart? F5(y)/F1(n)"


# 檢查頭和身體碰撞
def check_head_body_collision():
    head = game.snake.body[0]
    body = game.snake.body

    try:
        index = [cell.to_tuple() for cell in body[1:]].index(head.to_tuple())  # 頭和身體重疊
    except ValueError:
        index = -1

    if len(game.snake.body) > 1 and index > -1:
        game.snake.body = game.snake.body[:index]
        game.running = False


# 蛇吃食物並變長
def check_food():
    if game.food is not None and is_snake_food_collide():
        cell = Cell(game.food[0], game.food[1])
        game.snake.body.insert(0, cell)  # 新增蛇的身體
        game.food = None


# 改變蛇的方向
def check_snake_dir():
    pressed_keys = pygame.key.get_pressed()  # 儲存按鍵資料

    # 判斷按鍵不等於蛇運行的反方向後改變方向
    if pressed_keys[pygame.K_UP] and not game.snake.direction == "D":
        game.snake.direction = "U"
    if pressed_keys[pygame.K_DOWN] and not game.snake.direction == "U":
        game.snake.direction = "D"
    if pressed_keys[pygame.K_LEFT] and not game.snake.direction == "R":
        game.snake.direction = "L"
    if pressed_keys[pygame.K_RIGHT] and not game.snake.direction == "L":
        game.snake.direction = "R"


# 隨機生成食物
def generate_food():
    while game.food is None:
        cell_diameter = CELL_RADIUS * 2
        rand_x = (
            random.randint(1, (int(SCREEN_SIZE[0] / cell_diameter)) - 1) * cell_diameter
        )  # 食物x座標
        rand_y = (
            random.randint(1, (int(SCREEN_SIZE[1] / cell_diameter)) - 1) * cell_diameter
        )  # 食物y座標

        if (rand_x, rand_y) not in [
            cell.to_tuple() for cell in game.snake.body
        ]:  # 讓食物不要生成在蛇的身體上
            game.food = (rand_x, rand_y)


def draw():
    game.screen.fill(WHITE)  # 填填滿視窗背景顏色(RGB三原色/255,255,255>>白色)

    if game.running:
        draw_snake()
        draw_food()
    else:
        draw_restart()

    pygame.display.flip()  # 更新視窗顯示


def draw_restart():
    font = pygame.font.Font(None, 16)
    restart_msg = font.render(game.message, True, LIGHT_GREY)
    game.screen.blit(restart_msg, MSG_POSITION)


# 繪製食物
def draw_food():
    if game.food is not None:
        pygame.draw.circle(game.screen, FOOD_COLOR, game.food, FOOD_RADIUS)


# 繪製貪吃蛇
def draw_snake():
    for cell in game.snake.body:
        pygame.draw.circle(
            game.screen, game.snake.color, cell.to_tuple(), game.snake.cell_size
        )


# 檢查是否重新開始
def check_restart():
    while not game.running:
        for event in pygame.event.get():
            if event.type == pygame.KEYUP and event.key == pygame.K_F5:
                game.snake = Snake()
                game.running = True
            if event.type == pygame.KEYUP and event.key == pygame.K_F1:
                return


if __name__ == "__main__":
    init_game()
    game = Game()

    while game.running:
        update()
        draw()
        check_restart()

    pygame.quit()
