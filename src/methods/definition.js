import { cpAbout, cpString, cpButtonGroup, cpSwitch, cpText } from "./features/util";
import { navType, textAlign, headerAlign } from "./features/definitionUtils";

export default {
  type: "items",
  component: "accordion",
  items: {
	dimensions: {
		uses: "dimensions",
		min: 0,
		max: 20,
		items: {
			// Navigation
			navType: cpButtonGroup("qAttributeExpressions.0.qExpression", "Navigation type", "='none'", navType),
			navUrl: cpString("qAttributeExpressions.1.qExpression", "URL navigation", "", "always", "string", "expression", (data) => data.qAttributeExpressions[0].qExpression == "='url'"),
			navSheet: cpString("qAttributeExpressions.2.qExpression", "Sheet navigation", "", "always", "string", "expression", (data) => data.qAttributeExpressions[0].qExpression == "='sheet'"),
			navSel: cpString("qAttributeExpressions.3.qExpression", "Value to select(Field;value|Field;value:value:..)", "", "always", "string", "expression", (data) => data.qAttributeExpressions[0].qExpression == "='sheet'"),
			navClear: cpString("qAttributeExpressions.4.qExpression", "Value to clear(Field|Field)", "", "always", "string", "expression", (data) => data.qAttributeExpressions[0].qExpression == "='sheet'"),
			// Settings	
			visibility: cpString("qAttributeExpressions.5.qExpression", "Show column IF", "", "always", "string", "expression"),
			bgColor: cpString("qAttributeExpressions.6.qExpression", "Background color", "", "always", "string", "expression"),
			textColor: cpString("qAttributeExpressions.7.qExpression", "Text color", "", "always", "string", "expression"),
			textAlign: cpButtonGroup("qAttributeExpressions.8.qExpression", "Text align", "='left'", textAlign),
			textSize: cpString("qAttributeExpressions.9.qExpression", "Text size", "", "always", "string", "expression"),
			headerAlign: cpButtonGroup("qAttributeExpressions.10.qExpression", "Header align", "='center'", headerAlign),
			colWidth: cpString("qAttributeExpressions.11.qExpression", "Column width", "", "always", "string", "expression"),
			headerColor: cpString("qAttributeExpressions.12.qExpression", "Header text color", "", "always", "string", "expression"),
			headerBG: cpString("qAttributeExpressions.13.qExpression", "Header background color", "", "always", "string", "expression"),
		}
	},
	measures: {
		uses: "measures",
		min: 0,
		max: 20,
		items: {
			// Navigation
			navType: cpButtonGroup("qAttributeExpressions.0.qExpression", "Navigation type", "='none'", navType),
			navUrl: cpString("qAttributeExpressions.1.qExpression", "URL navigation", "", "always", "string", "expression", (data) => data.qAttributeExpressions[0].qExpression == "='url'"),
			navSheet: cpString("qAttributeExpressions.2.qExpression", "Sheet navigation", "", "always", "string", "expression", (data) => data.qAttributeExpressions[0].qExpression == "='sheet'"),
			navSel: cpString("qAttributeExpressions.3.qExpression", "Value to select(Field;value|Field;value:value:..)", "", "always", "string", "expression", (data) => data.qAttributeExpressions[0].qExpression == "='sheet'"),
			navClear: cpString("qAttributeExpressions.4.qExpression", "Value to clear(Field|Field)", "", "always", "string", "expression", (data) => data.qAttributeExpressions[0].qExpression == "='sheet'"),
			// Settings	
			visibility: cpString("qAttributeExpressions.5.qExpression", "Show column IF", "", "always", "string", "expression"),
			bgColor: cpString("qAttributeExpressions.6.qExpression", "Background color", "", "always", "string", "expression"),
			textColor: cpString("qAttributeExpressions.7.qExpression", "Text color", "", "always", "string", "expression"),
			textAlign: cpButtonGroup("qAttributeExpressions.8.qExpression", "Text align", "='left'", textAlign),
			textSize: cpString("qAttributeExpressions.9.qExpression", "Text size", "", "always", "string", "expression"),
			headerAlign: cpButtonGroup("qAttributeExpressions.10.qExpression", "Header align", "='center'", headerAlign),
			colWidth: cpString("qAttributeExpressions.11.qExpression", "Column width", "", "always", "string", "expression"),
			headerColor: cpString("qAttributeExpressions.12.qExpression", "Header text color", "", "always", "string", "expression"),
			headerBG: cpString("qAttributeExpressions.13.qExpression", "Header background color", "", "always", "string", "expression"),
		}
	},
    settings: {
      	uses: "settings",
    },
    config: {
		type: "items",
		label: "Configuration",
		items: {
       		// Insert component
			headerColor: cpString("GCT.CSS.headerColor", "Header color", "", "", "string"),
			padding: cpString("GCT.CSS.padding", "Cell padding", "", "", "string"),
			showBorder: cpSwitch("GCT.CSS.border", "Show border", "Yes", "No", false),
			borderSize: cpString("GCT.CSS.borderSize", "Custom cell border", "", "", "string", null, (data) => data.GCT.CSS.border),
			fixedHeader: cpSwitch("GCT.CSS.fixedHeader", "Fixed header", "Yes", "No", false),
			divider: cpText(" "),
			warning: cpText("Custom order requires a page refresh!"),
			customOrder: cpString("GCT.customOrder", 'Column order: ["name", "name",...]', "", "", "string"),
		},
    },

    about: cpAbout("extension", "1.0.0"),
  },
};
