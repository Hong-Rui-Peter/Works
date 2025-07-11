import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginForm {
    account: string;
    password: string;
}

const Login = () => {
    const [form, setForm] = useState<LoginForm>({ account: "", password: "" });
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(""); // 清除之前的錯誤

        try {
            const res = await fetch("api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // 保留 session
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!data.status) {
                throw new Error(data.msg || "登入失敗");
            }

            // 儲存登入狀態（簡單做法）
            sessionStorage.setItem("user", form.account);
            alert("登入成功！");
            navigate("/");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("發生未知錯誤");
            }
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>
            <h2 className="mb-4">登入</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    name="account"
                    value={form.account}
                    onChange={handleChange}
                    placeholder="帳號"
                    className="form-control my-2"
                    required
                />
                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="密碼"
                    className="form-control my-2"
                    required
                />
                <button type="submit" className="btn btn-success w-100">
                    登入
                </button>
            </form>
        </div>
    );
};

export default Login;