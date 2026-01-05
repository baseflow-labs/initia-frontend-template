import Button from "@initia/shared/ui/components/core/button";
import { faComputer, faMaximize, faMobile, faTablet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LandingPageManagementPreview = () => {
  // const { t } = useTranslation();

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
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

        <div className="text-end">
          <Button outline>
            <FontAwesomeIcon icon={faMaximize} />
          </Button>
        </div>
      </div>

      <div className="card-body">Preview</div>
    </div>
  );
};

export default LandingPageManagementPreview;
