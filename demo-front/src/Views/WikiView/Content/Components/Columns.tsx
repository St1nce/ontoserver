import { VerticalLine } from "Components/Line";
import {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import Column from "./Column";

const MIN_VERTICAL_LINE_WIDTH = 41;

const StyledVerticalColumnLine = styled.div`
  flex: 0 0 ${MIN_VERTICAL_LINE_WIDTH}px;

  & > .vertical-line {
    height: 100%;
    margin: auto;
  }
`;

const VerticalColumnLine: React.FC<{}> = () => {
  return (
    <StyledVerticalColumnLine>
      <VerticalLine />
    </StyledVerticalColumnLine>
  );
};

let calculateCountOfColumns = (
  widthElement: number,
  widthHost: number
): number => {
  return Math.max(Math.floor(widthHost / widthElement), 1);
};

let calculateColumnsData = (array: any[], countColumns: number): any[] => {
  let columnsBounds: number[] = [-1];
  let countColumnData = Math.ceil(array.length / countColumns);
  for (let i = 1; i < countColumns; i++) {
    columnsBounds.push(countColumnData * i - 1);
  }
  columnsBounds.push(array.length - 1);

  let columnsData = [];
  for (let i = 0; i < countColumns; i++) {
    columnsData.push(
      array.slice(columnsBounds[i] + 1, columnsBounds[i + 1] + 1)
    );
  }

  return columnsData;
};

const RefWithHandleWindowResize = (
  widthState: [number, React.Dispatch<React.SetStateAction<number>>]
): React.RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement>(null);

  function handleWindowResize() {
    widthState[1](
      ref.current?.parentElement ? ref.current.parentElement.clientWidth : 0
    );
  }
  useLayoutEffect(() => handleWindowResize(), []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return ref;
};

const Columns: React.FC<{
  children: ReactElement<{ id: string }>[];
  maxColumnWidth: number;
}> = ({ children, maxColumnWidth }) => {
  const [widthHost, setWidthHost] = useState(0);

  let ref = RefWithHandleWindowResize([widthHost, setWidthHost]);

  let columnsData = calculateColumnsData(
    children,
    calculateCountOfColumns(maxColumnWidth, widthHost)
  );

  return (
    <div className="columns-div" ref={ref}  key={"Columns" + Date.now().valueOf()}>
      {columnsData.map((columnData, index) => (
        <>
          <Column key={"Column" + index + Date.now().valueOf()} maxWidth={maxColumnWidth}>
            {columnData}
          </Column>
          {index !== columnsData.length - 1 && <VerticalColumnLine />}
        </>
      ))}
    </div>
  );
};

export default Columns;
