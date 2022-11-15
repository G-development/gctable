import { cpAbout, cpString, cpButtonGroup, cpSwitch, cpText, cpTextArea} from "./features/util";
import { navType, textAlign, headerAlign, hideHeader, canFilter } from "./features/definitionUtils";

export default {
  type: "items",
  component: "accordion",
  items: {
	dimensions: {
		uses: "dimensions",
		min: 0,
		max: 20,
		items: {
			visibility: { type: "string", label: "Show column if", ref: "qCalcCondition.qCond.qv", component: "expression" },
			// Navigation
			navType: cpButtonGroup("qAttributeExpressions.0.qExpression", "Navigation type", "='sheet'", navType),
			navUrl: cpString("qAttributeExpressions.1.qExpression", "URL navigation", "", "always", "string", "expression", (data) => data.qAttributeExpressions[0].qExpression == "='url'"),
			navSheet: cpString("qAttributeExpressions.2.qExpression", "Sheet navigation", "", "always", "string", "expression", (data) => data.qAttributeExpressions[0].qExpression == "='sheet'"),
			navSel: cpString("qAttributeExpressions.3.qExpression", "Value to select(Field;value|Field;value:value:..)", "", "always", "string", "expression", (data) => data.qAttributeExpressions[0].qExpression == "='sheet'"),
			navClear: cpString("qAttributeExpressions.4.qExpression", "Value to clear(Field|Field)", "", "always", "string", "expression", (data) => data.qAttributeExpressions[0].qExpression == "='sheet'"),
			// Settings	
			bgColor: cpString("qAttributeExpressions.5.qExpression", "Background color", "", "always", "string", "expression"),
			textColor: cpString("qAttributeExpressions.6.qExpression", "Text color", "", "always", "string", "expression"),
			textAlign: cpButtonGroup("qAttributeExpressions.7.qExpression", "Text align", "='left'", textAlign),
			textSize: cpString("qAttributeExpressions.8.qExpression", "Text size", "", "always", "string", "expression"),
			// Only for header
			canFilter: cpButtonGroup("qAttributeExpressions.16.qExpression", "Can filter", "='yes'", canFilter),
			hideHeader: cpButtonGroup("qAttributeExpressions.14.qExpression", "Header", "='show'", hideHeader),
			headerAlign: cpButtonGroup("qAttributeExpressions.9.qExpression", "Header align", "='center'", headerAlign),
			colSpan: cpString("qAttributeExpressions.15.qExpression", "ColSpan", "", "always", "string", "expression"),
			colWidth: cpString("qAttributeExpressions.10.qExpression", "Column width", "", "always", "string", "expression"),
			headerColor: cpString("qAttributeExpressions.11.qExpression", "Header text color", "", "always", "string", "expression"),
			headerBG: cpString("qAttributeExpressions.12.qExpression", "Header background color", "", "always", "string", "expression"),
			// More
			replaceIF: cpString("qAttributeExpressions.13.qExpression", "Replace IF", "", "always", "string", "expression"),
		}
	},
	measures: {
		uses: "measures",
		min: 0,
		max: 20,
		items: {
			visibility: { type: "string", label: "Show column if", ref: "qCalcCondition.qCond.qv", component: "expression" },
			// Navigation
			navType: cpButtonGroup("qAttributeExpressions.0.qExpression", "Navigation type", "='none'", navType),
			navUrl: cpString("qAttributeExpressions.1.qExpression", "URL navigation", "", "always", "string", "expression", (data) => data.qAttributeExpressions[0].qExpression == "='url'"),
			navSheet: cpString("qAttributeExpressions.2.qExpression", "Sheet navigation", "", "always", "string", "expression", (data) => data.qAttributeExpressions[0].qExpression == "='sheet'"),
			navSel: cpString("qAttributeExpressions.3.qExpression", "Value to select(Field;value|Field;value:value:..)", "", "always", "string", "expression", (data) => data.qAttributeExpressions[0].qExpression == "='sheet'"),
			navClear: cpString("qAttributeExpressions.4.qExpression", "Value to clear(Field|Field)", "", "always", "string", "expression", (data) => data.qAttributeExpressions[0].qExpression == "='sheet'"),
			// Settings	
			bgColor: cpString("qAttributeExpressions.5.qExpression", "Background color", "", "always", "string", "expression"),
			textColor: cpString("qAttributeExpressions.6.qExpression", "Text color", "", "always", "string", "expression"),
			textAlign: cpButtonGroup("qAttributeExpressions.7.qExpression", "Text align", "='right'", textAlign),
			textSize: cpString("qAttributeExpressions.8.qExpression", "Text size", "", "always", "string", "expression"),
			// Only for header
			hideHeader: cpButtonGroup("qAttributeExpressions.14.qExpression", "Header", "='show'", hideHeader),
			headerAlign: cpButtonGroup("qAttributeExpressions.9.qExpression", "Header align", "='center'", headerAlign),
			colSpan: cpString("qAttributeExpressions.15.qExpression", "ColSpan", "", "always", "string", "expression"),
			colWidth: cpString("qAttributeExpressions.10.qExpression", "Column width", "", "always", "string", "expression"),
			headerColor: cpString("qAttributeExpressions.11.qExpression", "Header text color", "", "always", "string", "expression"),
			headerBG: cpString("qAttributeExpressions.12.qExpression", "Header background color", "", "always", "string", "expression"),
			// More
			replaceIF: cpString("qAttributeExpressions.13.qExpression", "Replace IF", "", "always", "string", "expression"),
		}
	},
    settings: {
      	uses: "settings",
    },
	sorting: {
		uses: "sorting"
	},
	addons: {
		uses: "addons",
		items: {
			dataHandling: {
				uses: "dataHandling"
			}
		}
	},
    config: {
		type: "items",
		label: "Configuration",
		items: {
       		totalSwitch: cpSwitch("GCT.total", "Total row", "Yes", "No", false),
			headerColor: cpString("GCT.CSS.headerColor", "Header color", "", "", "string"),
			padding: cpString("GCT.CSS.padding", "Cell padding", "", "", "string"),
			showBorder: cpSwitch("GCT.CSS.border", "Show border", "Yes", "No", true),
			borderSize: cpString("GCT.CSS.borderSize", "Custom cell border", "", "", "string", null, (data) => data.GCT.CSS.border),
			divider: cpText(" "),
			warning: cpText("Custom order requires a page refresh!"),
			customOrder: cpTextArea("GCT.customOrder", 'Column order: ["name", "name",...]', "", 7, 1000),
		},
    },

    about: cpAbout("extension", "1.0.0"),
  },
};
