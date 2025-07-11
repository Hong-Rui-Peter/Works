import "../assets/css/bootstrap.min.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./Header.css";

const Header = () => {
  const [user, setUser] = useState<string | null>(
    sessionStorage.getItem("user")
  );
  const navigate = useNavigate();
  const location = useLocation();

  // 每次路由變化都檢查登入狀態
  useEffect(() => {
    setUser(sessionStorage.getItem("user"));
  }, [location]);

  const handleLogout = async () => {
    await fetch("api/user/logout", {
      method: "POST",
      credentials: "include",
    });
    sessionStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="navbar-wrapper" bg="light" variant="light">
      <Container fluid>
        <Link className="logo-txt" to="/">
          <i className="fas fa-book"></i>
          <span>&nbsp; 書界小說</span>
        </Link>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              首頁
            </Nav.Link>
            {user == "admin" && (
            <Nav.Link as={Link} to="/admin">管理系統</Nav.Link>
            )
            }
            <Nav.Link as={Link} to="/favorite">
                            Favorite
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <NavDropdown title="分類" id="nav-dropdown">
              <NavDropdown.Item href="/result?tag=玄幻奇幻">
                玄幻奇幻
              </NavDropdown.Item>
              <NavDropdown.Item href="/result?tag=武俠仙俠">
                武俠仙俠
              </NavDropdown.Item>
              <NavDropdown.Item href="/result?tag=現代都市">
                現代都市
              </NavDropdown.Item>
              <NavDropdown.Item href="/result?tag=歷史軍事">
                歷史軍事
              </NavDropdown.Item>
              <NavDropdown.Item href="/result?tag=科幻小說">
                科幻小說
              </NavDropdown.Item>
              <NavDropdown.Item href="/result?tag=遊戲競技">
                遊戲競技
              </NavDropdown.Item>
              <NavDropdown.Item href="/result?tag=恐怖靈異">
                恐怖靈異
              </NavDropdown.Item>
              <NavDropdown.Item href="/result?tag=言情小說">
                言情小說
              </NavDropdown.Item>
              <NavDropdown.Item href="/result?tag=其他類型">
                其他類型
              </NavDropdown.Item>
            </NavDropdown>
            {user ? (
              <>
                <Nav.Link disabled>Hi, {user}</Nav.Link>
                <Nav.Link
                  as="button"
                  className="btn btn-link"
                  onClick={handleLogout}
                >
                  登出
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  登入
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  註冊
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
