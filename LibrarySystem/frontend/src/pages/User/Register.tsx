import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface RegisterForm {
    account: string;
    password: string;
    email: string;
    name: string;
}

const Register = () => {
    const [form, setForm] = useState<RegisterForm>({
        account: "",
        password: "",
        email: "",
        name: ""
    });
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("api/user/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!data.status) {
                throw new Error(data.msg || "註冊失敗");
            }

            alert("註冊成功，請登入！");
            navigate("/login");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("發生未知錯誤");
            }
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <h2 className="mb-4">註冊</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    name="account"
                    placeholder="帳號"
                    value={form.account}
                    onChange={handleChange}
                    className="form-control my-2"
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="密碼"
                    value={form.password}
                    onChange={handleChange}
                    className="form-control my-2"
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-control my-2"
                    required
                />
                <input
                    name="name"
                    placeholder="姓名"
                    value={form.name}
                    onChange={handleChange}
                    className="form-control my-2"
                    required
                />
                <button type="submit" className="btn btn-primary w-100">註冊</button>
            </form>
        </div>
    );
};

export default Register;
