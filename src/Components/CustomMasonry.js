import {React,useState,useEffect} from 'react';

export const CustomMasonry = (props)=> {
  const [columnCount,setColumnCount] = useState(props.breakpointCols.defaut);

  useEffect(()=>{
    reCalculateColumnCount();
    window.addEventListener('resize',reCalculateColumnCountDebounce);


    return ()=>{
      window.removeEventListener('resize', reCalculateColumnCountDebounce);
    }

  })

  useEffect(()=>{
    reCalculateColumnCount();
  },[columnCount])

  const reCalculateColumnCountDebounce=()=> {
    const lastRecalculateAnimationFrame = window.requestAnimationFrame(() => {
      reCalculateColumnCount();
    });
  }

  const reCalculateColumnCount=()=> {
    const windowWidth = window && window.innerWidth || Infinity;
    let breakpointColsObject = props.breakpointCols;

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

    if(columnCount !== columns) {
      setColumnCount(columns)
    }
  }

  const itemsInColumns=()=> {
    const itemsInColumns = new Array(columnCount);

    for (let i = 0; i < props.children.length; i++) {
      const columnIndex = i % columnCount;

      if(!itemsInColumns[columnIndex]) {
        itemsInColumns[columnIndex] = [];
      }

      itemsInColumns[columnIndex].push(props.children[i]);
    }

    return itemsInColumns;
  }

  const renderColumns=()=> {
    const childrenInColumns = itemsInColumns();
    const columnWidth = `${100 / childrenInColumns.length}%`;
    let className = props.columnClassName;


    const columnAttributes = {
      style: {     
        width: columnWidth
      },
      className
    };
    return childrenInColumns.map((items, i) => {
      return <div {...columnAttributes} key={i}>
        {items}
      </div>;
    });
  }

    return (
      <div className={props.className}>
        {renderColumns()}
      </div>
    );
}
