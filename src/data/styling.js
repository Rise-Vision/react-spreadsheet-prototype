
var stylingData = {
  body: {
    className: "body_font-style",
    style: {
      font: {
        family: "helvetica,arial,sans-serif",
        type: "standard",
        url: ""
      },
      size: "16px",
      customSize: "",
      align: "left",
      bold: false,
      italic: false,
      underline: false,
      forecolor: "grey",
      backcolor: "transparent"
    }
  },
  columns: [
    {
      id: 1,
      width: 400,
      headerText: "Custom Column",
      verticalAlign: "bottom",
      style: {
        font: {
          family: "courier new,courier,monospace",
          type: "standard",
          url: ""
        },
        size: "14px",
        customSize: "",
        align: "right",
        bold: true,
        italic: false,
        underline: false,
        forecolor: "green",
        backcolor: "transparent"
      }
    }
  ],
  defaultColumnWidth: 200,
  headers: {
    className: "header_font-style",
    style: {
      font: {
        family: "verdana,geneva,sans-serif",
        type: "standard",
        url: ""
      },
      size: "18px",
      customSize: "",
      align: "center",
      bold: true,
      italic: false,
      underline: true,
      forecolor: "blue",
      backcolor: "#ffcc00"
    }
  },
  rows: {
    colors: {
      even: "#E5E9EF",
      odd: "#EEEFE5"
    },
    height: 50
  }
};

module.exports = stylingData;