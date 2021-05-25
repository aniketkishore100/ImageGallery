import React from 'react';

const DEFAULT_COLUMNS = 2;

class Masonry extends React.Component {
  constructor(props) {
    super(props);
    let columnCount
    columnCount = this.props.breakpointCols.default
  

    this.state = {
      columnCount
    };

  }

  componentDidMount() {
    this.reCalculateColumnCount();
    window.addEventListener('resize', this.reCalculateColumnCountDebounce);
  }

  componentDidUpdate() {
    this.reCalculateColumnCount();
  }

  componentWillUnmount() {
      window.removeEventListener('resize', this.reCalculateColumnCountDebounce);
  }

  reCalculateColumnCountDebounce=()=> {
    this._lastRecalculateAnimationFrame = window.requestAnimationFrame(() => {
      this.reCalculateColumnCount();
    });
  }

  reCalculateColumnCount=()=> {
    const windowWidth = window && window.innerWidth || Infinity;
    let breakpointColsObject = this.props.breakpointCols;

    if(typeof breakpointColsObject !== 'object') {
      breakpointColsObject = {
        default: parseInt(breakpointColsObject)
      }
    }

    let matchedBreakpoint = Infinity;
    let columns = breakpointColsObject.default

    for(let breakpoint in breakpointColsObject) {
      const optBreakpoint = parseInt(breakpoint);
      const isCurrentBreakpoint = optBreakpoint > 0 && windowWidth <= optBreakpoint;

      if(isCurrentBreakpoint && optBreakpoint < matchedBreakpoint) {
        matchedBreakpoint = optBreakpoint;
        columns = breakpointColsObject[breakpoint];
      }
    }

    columns = Math.max(1, parseInt(columns) || 1);

    if(this.state.columnCount !== columns) {
      this.setState({
        columnCount: columns
      });
    }
  }

  itemsInColumns() {
    const currentColumnCount = this.state.columnCount;
    const itemsInColumns = new Array(currentColumnCount);

    const items = this.props.children

    for (let i = 0; i < items.length; i++) {
      const columnIndex = i % currentColumnCount;

      if(!itemsInColumns[columnIndex]) {
        itemsInColumns[columnIndex] = [];
      }

      itemsInColumns[columnIndex].push(items[i]);
    }

    return itemsInColumns;
  }

  renderColumns() {
    const {columnClassName } = this.props;
    
    const childrenInColumns = this.itemsInColumns();
    const columnWidth = `${100 / childrenInColumns.length}%`;
    let className = columnClassName;


    const columnAttributes = {
      style: {     
        width: columnWidth
      },
      className
    };
    return childrenInColumns.map((items, i) => {
      return <div
        {...columnAttributes}

        key={i}
      >
        {items}
      </div>;
    });
  }

  logDeprecated(message) {
    console.error('[Masonry]', message);
  }

  render() {
    const {
      // ignored
      children,//images
      breakpointCols,//3
      columnClassName, //my-masonry-grid_column


      // used
      className,//my-masonry-grid"

      ...rest
    } = this.props;
    {console.log(this.props)}
    let classNameOutput = className;

    if(typeof className !== 'string') {
      this.logDeprecated('The property "className" requires a string');

      // This is a deprecated default and will be removed soon.
      if(typeof className === 'undefined') {
        classNameOutput = 'my-masonry-grid';
      }
    }

    return (
      <div
        
        className={classNameOutput}
      >
        {this.renderColumns()}
      </div>
    );
  }
}

export default Masonry;