import ButtonWithAction from "./buttonActive.tsx";
import Logo from './img/logo.svg';
import './styles/header.css';

const Header = () => (
    <header className="header">
        <div className="header-container">
           
        <img src={Logo} alt="logo" className="logo"/>
            
            <div className="button-group">
            <ButtonWithAction
                text="Users"
                anchor="users-section"
                active={true}
            />
                <ButtonWithAction
                text="Sign up"
                anchor="signup-form"
                active={true}
            />
            </div>
        </div>
    </header>
  );

  export default Header;