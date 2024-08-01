import ButtonWithAction from "./buttonActive.tsx";
import './styles/mainSection.css';

const Hero = () => (
    <div className="hero">
      <div className="hero-content">
        <h1>Test assignment for front-end developer</h1>
        <p>
          What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
        </p>
        <ButtonWithAction
        text="Sign up"
        anchor="signup-form"
        active={true}
      />
      </div>
    </div>
  );

  export default Hero;