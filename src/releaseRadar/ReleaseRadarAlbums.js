import React from 'react';
import albums from './json/albums.json';
import columns from './json/columns.json';
import Table from './AlbumTable';

function ReleaseRadarAlbums(props){
  const renderer = {
    artists:_renderArtists,
    name:_renderAlbumName
  }

  return (
    <div className="releaseRadarAlbums">
      <h1>Spotify Release Radar Albums 2</h1>
      <Table
        columns={columns}
        rows={albums}
        render={renderer}
      />
    </div>
  );
}

function _renderAlbumName(value, row){
  return (<a href={row.url}>{value}</a>);
}

function _renderArtists(value, row){
  console.log('_renderArtists');
  if(Array.isArray(value)){
    console.log('artists is an array');
    const artists = value.map((artist,index)=>{
      const key = artist;
      return (<li><a key={key} href={row.artist_urls[index]}>{artist}</a></li>);
    });
    return (
      <ul className="artists">
      {artists}
      </ul>
    );
  }else{
    return (<a href={row.artist_urls}>{value}</a>);
  }
}

export default ReleaseRadarAlbums;
