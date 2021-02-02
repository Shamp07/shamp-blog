import React from 'react';
import useStores from "../../../stores/useStores";
import FootprintRow, { FootprintRowInterface } from "./FootprintRow";

const FootPrint: React.FC = () => {
  const { footPrintList } = useStores();

  return (
    <div>
      {footPrintList.map(
        () =>
      )}
    </div>
  )
}

export default FootPrint;