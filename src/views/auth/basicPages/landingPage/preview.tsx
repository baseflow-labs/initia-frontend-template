import Button from "@/components/core/button";
import { faComputer, faMobile, faTablet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LandingPageManagementPreview = () => {
  // const { t } = useTranslation();

  return (
    <div className="card">
      <div className="card-header">
        <div className="d-flex gap-2">
          <Button outline>
            <FontAwesomeIcon icon={faComputer} />
          </Button>

          <Button outline>
            <FontAwesomeIcon icon={faTablet} />
          </Button>

          <Button outline>
            <FontAwesomeIcon icon={faMobile} />
          </Button>
        </div>
      </div>

      <div className="card-body">Preview</div>
    </div>
  );
};

export default LandingPageManagementPreview;
