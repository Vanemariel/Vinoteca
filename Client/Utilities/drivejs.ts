import { driver, DriveStep  } from "driver.js";
import "driver.js/dist/driver.css";

type Side = "left" | "right" | "top" | "bottom";
type Align = "start" | "center" | "end";

interface IExecutePopup {
  steps: DriveStep[];
}

export const executePopup = ({ steps }: IExecutePopup) => {
  const driverObj = driver({
    animate: false,
    showProgress: true,
    showButtons: ['next', 'previous', 'close'],
  });

  // Configura los pasos en la librería
  driverObj.setSteps(steps.map(({ element, title, description, side, align }) => ({
    element: element as string | HTMLElement,
    popover: {
      title,
      description,
      side: side as Side,
      align: align as Align,
    },
  })));

  // Inicia el recorrido
  driverObj.drive();
};