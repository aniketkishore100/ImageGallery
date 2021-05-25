import {React,useState,useEffect} from 'react';

export const CustomMasonry = (props)=> {
  const [columnCount,setColumnCount] = useState(props.breakpointCols.defaut);

  useEffect(()=>{ //on Component mount
    reCalculateColumnCount();
    window.addEventListener('resize',reCalculateColumnCountDebounce);

    return ()=>{ //on Component Unmount
      window.removeEventListener('resize', reCalculateColumnCountDebounce);
    }

  })

  useEffect(()=>{ //whenever state columnCount changes
    reCalculateColumnCount();
  },[columnCount])

  const reCalculateColumnCountDebounce=()=> { //calls reCalculateColumnCount function after a certain period of event halt
    const lastRecalculateAnimationFrame = window.requestAnimationFrame(() => {
      reCalculateColumnCount();
    });
  }

  const reCalculateColumnCount=()=> { // responsible for switching to Breakpoints with respect to size of window
    const windowWidth = window && window.innerWidth || Infinity;

    let breakpointMatch = Infinity; //threshold BreakPoint
    let columns = props.breakpointCols.default //columns set to default provided through the props

    for(let breakpoint in props.breakpointCols) {
      const breakpointOpt = parseInt(breakpoint);
      const isCurrentBreakpoint = breakpointOpt > 0 && windowWidth <= breakpointOpt; //checks if current window width is in the current default range

      if(isCurrentBreakpoint && breakpointOpt < breakpointMatch) { //if current width crosses the threshold resolution
        breakpointMatch = breakpointOpt;  //change the threshold width
        columns = props.breakpointCols[breakpoint]; // reset the columns according to new threshold
      }
    }

    columns = Math.max(1, parseInt(columns) || 1);

    if(columnCount !== columns) {
      setColumnCount(columns)
    }
  }

  const ColumnContent=()=> { //maps each item of the grid to Column number from 0 to column-1
    const itemsInColumns = new Array(columnCount);

    for (let i = 0; i < props.children.length; i++) {
      const columnIndex = i % columnCount;

      if(!itemsInColumns[columnIndex]) { //if current position in the array is empty 
        itemsInColumns[columnIndex] = []; //initialize with an empty array inside the itemsInColumns array
      }

      itemsInColumns[columnIndex].push(props.children[i]); //if already has empty nested array pushes the Column number i into the array
    }

    return itemsInColumns;
  }

  const renderColumns=()=> {
    const childrenInColumns = ColumnContent(); //array of arrays
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
