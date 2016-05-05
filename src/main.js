const React = require("react");
const ReactDOM = require("react-dom");
const ResponsiveFixedDataTable = require("responsive-fixed-data-table");
const {Table, Column, Cell} = require("fixed-data-table");

const sheet = document.querySelector("rise-google-sheet");

const FinancialTableHeader = React.createClass({
  getInitialState: function() {
    return {
      data: null
    };
  },

  componentDidMount: function() {
    sheet.addEventListener("rise-google-sheet-response", function(e) {
      if (e.detail && e.detail.cells) {
        this.setState({data: e.detail.cells});
      }
    }.bind(this));

    sheet.go();
  },

  componentWillUnmount: function() {
    sheet.removeEventListener("rise-google-sheet-response");
  },

  getColumnHeaders: function(totalCols) {
    var headers = [],
      startingCell = 1; // account for empty first row of cells except for last cell with current time

    for (var i = startingCell; i < (startingCell + totalCols); i += 1) {
      headers.push(this.state.data[i].content.$t);
    }

    return headers;
  },

  render: function () {
    var totalCols = 6,
      columnHeaders = null,
      cols = [];

    if (this.state.data) {
      columnHeaders = this.getColumnHeaders(totalCols);

      // Create the columns.
      for (var i = 0; i < totalCols; i++) {
        cols.push(
          <Column
            columnKey={i}
            header={<Cell>{columnHeaders[i]}</Cell>}
            width={200}
          />
        );
      }

      return(
        <Table
          rowHeight={1}
          rowsCount={0}
          width={1200}    // rsW
          height={50}   // rsH
          headerHeight={50}>
          {cols}
        </Table>
      );
    }
    else {
      return null;
    }
  }
});

const FinancialTable = React.createClass({
  getInitialState: function() {
    return {
      data: null
    };
  },

  componentDidMount: function() {
    var $app = $("#app");

    sheet.addEventListener("rise-google-sheet-response", function(e) {
      if (e.detail && e.detail.cells) {
        this.setState({ data: e.detail.cells });
      }

      // Must execute after data is rendered.
      $(".page").height(this.table.props.rowsCount * this.table.props.rowHeight);

      if ($app.data("plugin_autoScroll") === undefined) {
        $app.autoScroll({
          "by": "continuous",
          "speed": "fastest"
        }).on("done", function () {
          $app.data("plugin_autoScroll").play();
        });

        $app.data("plugin_autoScroll").play();
      }
    }.bind(this));

    sheet.go();
  },

  componentWillUnmount: function() {
    sheet.removeEventListener("rise-google-sheet-response");
  },

  // Convert data to a two-dimensional array of rows.
  getRows: function(totalCols) {
    var rows = [],
      row = null,
      startingCell = totalCols + 1; // account for empty first row of cells and column header cells

    for (var i = startingCell; i < this.state.data.length; i++) {

      if (this.state.data[i].gs$cell.col === '1') {
        if (row !== null) {
          rows.push(row);
        }

        row = [];
      }

      row.push(this.state.data[i].content.$t);
    }

    rows.push(row);

    return rows;
  },

  render: function() {
    var totalCols = 6,
      rows = null,
      cols = [];

    if (this.state.data) {
      rows = this.getRows(totalCols);

      // Create the columns.
      for (var i = 0; i < totalCols; i++) {
        cols.push(
          <Column columnKey={i}
            cell={ props => (
              <Cell>
                {rows[props.rowIndex][props.columnKey]}
              </Cell>
            )}
            width={200}
          />
        );
      }

      return(
        <ResponsiveFixedDataTable
          ref={(ref) => this.table = ref}
          rowHeight={50}
          rowsCount={rows.length}
          width={1200}    // rsW
          height={700}   // rsH
          headerHeight={0}
          overflowY="hidden">
          {cols}
        </ResponsiveFixedDataTable>
      );
    }
    else {
      return null;
    }
  }
});

window.addEventListener("WebComponentsReady", function(e) {
  ReactDOM.render(<FinancialTableHeader />, document.querySelector(".header"));
  ReactDOM.render(<FinancialTable />, document.querySelector(".page"));
});