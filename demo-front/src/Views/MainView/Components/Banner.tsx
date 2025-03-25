import "./Banner.css";

// style={{ backgroundImage: "url(/img/white-banner.jpg)" }}
const Banner: React.FC<{}> = () => {
  return (
    <div
      className="banner"
      style={{ backgroundImage: "url(/img/white-banner.jpg)" }}
    >
      <div className="about">
        
        <p>
        <b>Добро пожаловать на сайт LearnerContent</b>
        <br/>
        <br/>
        LearnerContent – это образовательная платформа, предназначенная для управления образовательными ресурсами. 
        Сайт поможет Вам подобрать образовательный контент по Вашим психометрическим характеристикам. 
        </p>
      </div>
      <div className="freepick">
        Designed by <a>Freepick</a>
      </div>
    </div>
  );
};

export default Banner;
