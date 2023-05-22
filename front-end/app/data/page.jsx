'use client';
import React, { useEffect } from 'react';

const TableauVisualization = () => {
  useEffect(() => {
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    document.getElementById('viz1684472411252').appendChild(scriptElement);

    return () => {

      document.getElementById('viz1684472411252').removeChild(scriptElement);
    };
  }, []);

  return (
    <div className="tableauContainer">
      <div className="tableauPlaceholder" id="viz1684472411252" style={{ position: 'relative' }}>
        <noscript>
          <a href="#">
            <img
              alt="Manufacturer and Install Date"
              src="https://public.tableau.com/static/images/Ma/ManufacturerandInstalldate/Story2/1_rss.png"
              style={{ border: 'none' }}
            />
          </a>
        </noscript>
        <object className="tableauViz" style={{ display: 'none' }}>
          <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
          <param name="embed_code_version" value="3" />
          <param name="site_root" value="" />
          <param name="name" value="ManufacturerandInstalldate/Story2" />
          <param name="tabs" value="no" />
          <param name="toolbar" value="yes" />
          <param name="static_image" value="https://public.tableau.com/static/images/Ma/ManufacturerandInstalldate/Story2/1.png" />
          <param name="animate_transition" value="yes" />
          <param name="display_static_image" value="yes" />
          <param name="display_spinner" value="yes" />
          <param name="display_overlay" value="yes" />
          <param name="display_count" value="yes" />
          <param name="language" value="en-US" />
          <param name="filter" value="publish=yes" />
        </object>
      </div>
      

      
    </div>
  );
};

export default TableauVisualization;

