# python-貪吃蛇遊戲(完整版)
import pygame, time, random

# 蛇的速度
snake_speed = 12

# 視窗大小
window_x = 720
window_y = 480

# 定義顏色
black = pygame.Color(0, 0, 0)
white = pygame.Color(255, 255, 255)
red = pygame.Color(255, 0, 0)
green = pygame.Color(0, 255, 0)
blue = pygame.Color(0, 0, 255)

# 初始化pygame
pygame.init()

# 初始化遊戲視窗
pygame.display.set_caption("GeeksforGeeks Snakes")
game_window = pygame.display.set_mode((window_x, window_y))

# FPS（每秒幀數）控制器
fps = pygame.time.Clock()

# 定義蛇初始位置
snake_position = [100, 50]

# 定義蛇的前4個身體(預設長度為4)
snake_body = [[100, 50], [90, 50], [80, 50], [70, 50]]

# 水果位置
fruit_position = [
    random.randrange(1, (window_x // 10)) * 10,
    random.randrange(1, (window_y // 10)) * 10,
]
fruit_spawn = True

# 預設的蛇方向向右
direction = "RIGHT"
change_to = direction

# 初始分數
score = 0


# 顯示分數
def show_score(choice, color, font, size):
    # 建立字型物件 score_font
    score_font = pygame.font.SysFont(font, size)

    # 建立顯示錶面物件 core_surface
    score_surface = score_font.render("Score : " + str(score), True, color)

    # 建立一個文字表面物件的矩形物件
    score_rect = score_surface.get_rect()

    # 顯示文字
    game_window.blit(score_surface, score_rect)


# 遊戲結束
def game_over():
    # 建立字型物件 my_font
    my_font = pygame.font.SysFont("times new roman", 50)

    # 建立可繪製文字的文字表面
    game_over_surface = my_font.render("Your Score is : " + str(score), True, red)

    # 建立一個文字表面物件的矩形物件
    game_over_rect = game_over_surface.get_rect()

    # 設定文字位置
    game_over_rect.midtop = (window_x / 2, window_y / 4)

    # blit 螢幕上繪製文字
    game_window.blit(game_over_surface, game_over_rect)
    pygame.display.flip()

    # 2 秒後自動退出程式
    time.sleep(2)

    # 停用 pygame 庫
    pygame.quit()

    # 退出程式
    quit()


# 主函數
while True:
    # pygame捕捉事件
    for event in pygame.event.get():
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_UP:
                change_to = "UP"
            if event.key == pygame.K_DOWN:
                change_to = "DOWN"
            if event.key == pygame.K_LEFT:
                change_to = "LEFT"
            if event.key == pygame.K_RIGHT:
                change_to = "RIGHT"

    # 判斷是否為反方向
    if change_to == "UP" and direction != "DOWN":
        direction = "UP"
    if change_to == "DOWN" and direction != "UP":
        direction = "DOWN"
    if change_to == "LEFT" and direction != "RIGHT":
        direction = "LEFT"
    if change_to == "RIGHT" and direction != "LEFT":
        direction = "RIGHT"

    # 移動
    if direction == "UP":
        snake_position[1] -= 10
    if direction == "DOWN":
        snake_position[1] += 10
    if direction == "LEFT":
        snake_position[0] -= 10
    if direction == "RIGHT":
        snake_position[0] += 10

    # 遊戲視窗填滿黑色
    game_window.fill(black)

    # 繪製貪吃蛇
    for pos in snake_body:
        snake_picture = pygame.draw.rect(
            game_window, green, pygame.Rect(pos[0], pos[1], 10, 10)
        )

    # 繪製水果
    fruit_picture = pygame.draw.rect(
        game_window, white, pygame.Rect(fruit_position[0], fruit_position[1], 10, 10)
    )

    # 水果和蛇碰撞，分數增加，蛇成長
    snake_body.insert(0, list(snake_position))

    if (
        # 方法一(座標判斷)
        snake_position[0] == fruit_position[0]
        and snake_position[1] == fruit_position[1]
        # 方法二(pygame精靈碰撞)
        or pygame.Rect.colliderect(snake_picture, fruit_picture)
    ):
        score += 10
        fruit_spawn = False
    else:
        snake_body.pop()

    # 水果被吃掉重新產生
    if not fruit_spawn:
        fruit_position = [
            random.randrange(1, (window_x // 10)) * 10,
            random.randrange(1, (window_y // 10)) * 10,
        ]

    fruit_spawn = True

    # 撞到邊界，遊戲結束
    if snake_position[0] < 0 or snake_position[0] > window_x - 10:
        game_over()
    if snake_position[1] < 0 or snake_position[1] > window_y - 10:
        game_over()

    # 蛇撞到自己，遊戲結束
    for block in snake_body[1:]:
        if snake_position[0] == block[0] and snake_position[1] == block[1]:
            game_over()

    # 連續顯示分數
    show_score(1, white, "times new roman", 20)

    # 重新整理遊戲畫面
    pygame.display.update()

    # 每秒幀數/重新整理率
    fps.tick(snake_speed)
