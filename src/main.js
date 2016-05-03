const React = require("react");
const ReactDOM = require("react-dom");
const {Table, Column, Cell} = require("fixed-data-table");

const sheet = document.querySelector("rise-google-sheet");

const FinancialTable = React.createClass({
  getInitialState: function() {
    return {
      data: null
    };
  },

  componentDidMount: function() {
    sheet.addEventListener("rise-google-sheet-response", function(e) {
      if (e.detail && e.detail.cells) {
        this.setState({ data: e.detail.cells });
      }
    }.bind(this));

    sheet.go();
  },

  componentWillUnmount: function() {
    sheet.removeEventListener("rise-google-sheet-response");
  },

  getColumnHeaders: function(totalCols) {
    var headers = [];

    for (var i = 0; i < totalCols; i += 1) {
      headers.push(this.state.data[i].content.$t);
    }

    return headers;
  },

  // Convert data to a two-dimensional array of rows.
  getRows: function(totalCols) {
    var rows = [],
      row = null;

    for (var i = totalCols; i < this.state.data.length; i++) {

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
      columnHeaders = null,
      cols = [];

    if (this.state.data) {
      rows = this.getRows(totalCols);
      columnHeaders = this.getColumnHeaders(totalCols);

      // Create the columns.
      for (var i = 0; i < totalCols; i++) {
        cols.push(
          <Column columnKey={i}
            header={<Cell>{columnHeaders[i]}</Cell>}
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
        <Table
          rowHeight={50}
          rowsCount={rows.length}
          width={1200}    // rsW
          height={800}   // rsH
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

window.addEventListener("WebComponentsReady", function(e) {
  ReactDOM.render(<FinancialTable />, document.getElementById("app"));
});