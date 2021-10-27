import React from "react"

export const PageBuilderContext = React.createContext()

export function PageBuilderContextProvider({
	                                           children,
	                                           refPageBuilderContainer,
	                                           elements,
	                                           refToolbarTop,
	                                           refToolbarRows,
                                           }) {
	// const [] = React.useState([])
	return <PageBuilderContext.Provider value={{
		refPageBuilderContainer,
		elements,
		refToolbarTop,
		refToolbarRows,
	}}>{children}</PageBuilderContext.Provider>
}
