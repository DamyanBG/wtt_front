/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Link } from '@mui/material';
import format from 'date-fns/format';

export default function CoreData({
  treeData, vacant,
}) {
  const {
    common, scientific, genus, datePlanted, dbh, height,
  } = treeData;
  const wikipediaLink = `https://en.wikipedia.org/wiki/${scientific}`;
  // format() will throw an exception if datePlanted is undefined, so check it first.
  const planted = datePlanted && format(new Date(datePlanted), 'MMMM d, yyyy');

  return (
    <div className="text-left">
      <h1>
        {common}
      </h1>
      {!vacant && (
        <div>
          <h2><a href={wikipediaLink} name={wikipediaLink} target="_blank" rel="noreferrer">{scientific}</a></h2>
          {(scientific !== genus) && <h2>{genus}</h2>}
          {height && <h5>Height: {height}</h5>}
          {dbh && <h5>DBH: {dbh}</h5>}
          {datePlanted && <h5>Planted: {planted}</h5>}
        </div>
      )}
    </div>
  );
}
