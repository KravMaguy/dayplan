import Joyride from "react-joyride";
const CustomRide = ({
  Tooltip,
  steps,
  run,
  stepIndex,
  callback,
  continuous,
  styles,
  hideBackButton,
}) => {
  return (
    <Joyride
      callback={callback}
      stepIndex={stepIndex}
      tooltipComponent={Tooltip}
      styles={styles}
      steps={steps}
      run={run}
      continuous={continuous}
      hideBackButton={hideBackButton}
    />
  );
};

export default CustomRide;
