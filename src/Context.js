import React, { createContext, useState } from "react";
import { heatmapCellStates } from "./components/consts";

export const Context = createContext({
    cellsData: [],
    setCellsData: () => { }
})

const ContextProvider = ({ children }) => {
    const [cellsData, setCellsData] = useState(heatmapCellStates.loading);

    const initialContext = {
        cellsData,
        setCellsData
    }

    return (
        <Context.Provider value={initialContext}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;