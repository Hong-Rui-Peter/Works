// package Memory Game;

import java.awt.*;// 使用Font類别請匯入java.awt.*套件
import java.awt.event.*;// 使用事件請匯入java,awt.event.*套件
import javax.swing.*;// 使用swing元件請匯入javax,swing.*套件

// MyJFrame(記憶大考驗遊戲視窗)繼承JFrame視窗元件
class MyJFrame extends JFrame {
    // 宣告icons[0]~icons[4]用來存放
    // 0.jpg(? 問號圖), 1.jpg, 2.jpg, 3.jpg, 4.jpg五個圖示
    private ImageIcon[] icons = new ImageIcon[5];
    private JButton[] jbtn = new JButton[8];// 宣告jbtn[0]~jbtn[7]八個按鈕
    private JButton jbtnOk, jbtnf, jbtns;// 宣告jbtnOk確定鈕，jbtnf表示第一次按下的按鈕，jbtns表示第二次按下的按钮
    String f = "", s = "";// 宣告f表示第一次按下按鈕取得的字串，s表示第二次按下按鈕取得的字串
    int num = 0, win = 0; // 宣告num表示按下按鈕的次數；win表示共猜對幾組圖示
    int[] rnd = new int[8]; // 建立rnd[o]~rnd[7]用來存放記憶大考驗每張圖所代表的編號

    // MyJFrame建構式
    MyJFrame() {
        super.setLayout(null);// 不使用版面配置
        super.setTitle("記憶大考驗");// 視窗標题設為"記憶大考验"

        // 設定icons[0]~icons[4]元件的圖示為memberImg資料夾下的0.jpg~4.jpg
        // 其中0.jpg為?問號圖
        for (int i = 0; i < icons.length; i++) {
            icons[i] = new ImageIcon(".\\memory_game\\image\\" + String.valueOf(i) + ".jpg");
        }

        // 在窗放入jbtnOk確定鈕
        jbtnOk = new JButton("確定");
        jbtnOk.setBounds(20, 260, 80, 30);
        jbtnOk.setFont(new Font("微軟中黑體", Font.PLAIN, 18));
        add(jbtnOk);

        // 指定jbtnOk確定鈕的傾聽者為ActionListener匿名物件
        // 按下確定鈕時會執行該物件的actionPerformed方法
        jbtnOk.addActionListener(new ActionListener() {// 按下確定鈕執行此處
            public void actionPerformed(ActionEvent evt) {
                int[] ary = new int[] { 1, 1, 2, 2, 3, 3, 4, 4 };// 建立ary[0]~ary[7]用來存放圖示的編號，編號相同的為同一組
                int n = 0;// 用來存放產生的亂數
                int max = ary.length - 1;

                // 使用迴圈jbtn[0]~jbtn[7]進行亂數存放1.jpg~4.jpg
                // 編號相同為同一組
                for (int i = 0; i < ary.length; i++) {
                    n = (int) Math.round((Math.random() * max));
                    rnd[i] = ary[n];
                    ary[n] = ary[max];
                    max--;

                    jbtn[i].setActionCommand(String.valueOf(rnd[i]));
                    jbtn[i].setToolTipText(String.valueOf(i));
                    jbtn[i].setIcon(icons[0]);
                    jbtn[i].setEnabled(true);
                }
            }
        });

        // 建立btn[0]~jbtn[7]八個按鈕，排成兩行，一行有四個按鈕
        int x = 0, y = 0;

        for (int i = 0; i < jbtn.length; i++) {
            jbtn[i] = new JButton();
            jbtn[i].setBounds(x * 100 + 20, y * 120 + 20, 80, 100);
            jbtn[i].setIcon(icons[0]);// 按鈕預設顯示?問號圖
            jbtn[i].setEnabled(false);
            x++;

            if (i % 4 == 3) {
                y++;
                x = 0;
            }

            add(jbtn[i]);// 在視窗放入btn[0]~jbtn[7]八個按鈕

            // 指定jbtn[0]~jbtn[7]八個按鈕的傾聽者為ActionListener匿名物件
            // 當按下jbtn[0]~jbtn[7]時會執行該物件的actionPerformed方法
            jbtn[i].addActionListener(new ActionListener() {
                public void actionPerformed(ActionEvent evt) {
                    num++;// 按下按鈕次數加1

                    if (num == 1) {// 第一次按下
                        f = evt.getActionCommand();// 取得第一次按下按鈕代表的字串
                        jbtnf = (JButton) evt.getSource();// 取得第一次按下按鈕
                        jbtn[Integer.parseInt(jbtnf.getToolTipText())].setIcon(icons[Integer.parseInt(f)]);
                    } else if (num == 2) {// 第二次按下
                        s = evt.getActionCommand();// 取得第二次按下按鈕代表的字串
                        jbtns = (JButton) evt.getSource();// 取得第二次按下按鈕
                        jbtn[Integer.parseInt(jbtns.getToolTipText())].setIcon(icons[Integer.parseInt(s)]);

                        // 若第一次按下按鈕的f字串與第二次按下按鈕的s字串相等
                        // 且第一次按下按鈕與第二次按下按鈕不是同一個，則表示猜對一組圖示
                        if (f.equals(s) && jbtns != jbtnf) {
                            JOptionPane.showMessageDialog(null, "猜對了！");
                            jbtnf.setEnabled(false);// 第一次按纽的按鈕停用
                            jbtns.setEnabled(false);// 第二次按纽的按纽停用
                            win++;// 猜對組數加一

                            if (win == 4) {// 若猜對四組
                                JOptionPane.showMessageDialog(null, "全對了...ya!");
                            }
                        } else {// 若沒有猜對任一組圖示，則之前按下的按纽皆還原成？問號圖示
                            JOptionPane.showMessageDialog(null, "不對哦！");
                            jbtnf.setIcon(icons[0]);
                            jbtns.setIcon(icons[0]);
                        }

                        f = "";
                        s = "";
                        num = 0;
                    }
                }
            });

            setSize(430, 360);// 設定覤窗大小為寬430，高360
            setVisible(true);// 顯示視窗
            setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);// 設定按視窗的關閉鈕會結束程式
        }
    }
}

// 主程式
public class Memory_Game {
    public static void main(String[] args) {
        // 建立MyJFrame視窗（記憶大考驗遊戴）
        new MyJFrame();// 呼叫MyJFrame預設建構式
    }
}