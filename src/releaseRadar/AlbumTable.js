import React from 'react';

function AlbumTable(props){
  let primary = null;
  const colOrder = [];
  const columns = props.columns.map(col=>{
    const key = col.id;
    //console.log('col key', key);
    colOrder.push(col.id);
    if(col.primary){
      primary = col.id;
    }
    return (<th key={key}>{col.label}</th>);
  });

  const rows = props.rows.map(row=>{
    const rKey = row[primary];
    const tds = colOrder.map((cKey, index)=>{
      const key = rKey+cKey;
      return <td key={key}>{_renderTableCell(props.render, props.columns[index], row[cKey], row)}</td>
    });

    return (
      <tr key={rKey}>
        {tds}
      </tr>
    );
  });

  return (
    <table>
      <thead>
      <tr>
      {columns}
      </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}

const typeMap ={
  "string":_renderString,
  "int":_renderString,
  "image":_renderImage,
  "date":_renderDate
}

function _renderTableCell(render, column, value, row){
  const renderer = typeMap[column.type]

  if(render[column.id]){
    return render[column.id](value, row);
  } else if(renderer){
    return renderer(value, row);
  }else{
    throw new Error('Unknown column type ' + column.type);
  }
}

function _renderString(value, row){
  return value;
}

function _renderImage(value, row){
  return (<img src={value}/>);
}

function _renderDate(value,row){
  let date = new Date(value);
  return date.toLocaleDateString();
}

export default AlbumTable;
