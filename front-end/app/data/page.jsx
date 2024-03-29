'use client'
import { React, useEffect } from 'react'
const TableauVisualization = () => {
  useEffect(() => {
    const scriptElement = document.createElement('script')
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js'
    document.getElementById('viz1684472411252').appendChild(scriptElement)

    return () => {
      document.getElementById('viz1684472411252').removeChild(scriptElement)
    }
  }, [])

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

        <noscript>
          <a href="#">
            <img
              alt="Pole Detailed Information"
              src="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Sn&#47;SnohomishCountyPUD-TransmissionPoleDetails&#47;
              Story1&#47;1_rss.png"
              style={{ border: 'none' }}
            />
          </a>
        </noscript>

        <object className="tableauViz" style={{ display: 'none' }}>
          <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
          <param name="embed_code_version" value="3" />
          <param name="site_root" value="" />
          <param name="name" value="SnohomishCountyPUD-TransmissionPoleDetails&#47;Story1" />
          <param name="tabs" value="no" />
          <param name="toolbar" value="yes" />
          <param name="static_image" value="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Sn&#47;
      SnohomishCountyPUD-TransmissionPoleDetails&#47;Story1&#47;1.png" />
          <param name="animate_transition" value="yes" />
          <param name="display_static_image" value="yes" />
          <param name="display_spinner" value="yes" />
          <param name="display_overlay" value="yes" />
          <param name="display_count" value="yes" />
          <param name="language" value="en-US" />
          <param name="filter" value="publish=yes" />
        </object>

        <noscript>
        <a href="#"><img alt="Drawing, Line, and Pole information"
          src="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;fi&#47;final_16862689625800&#47;Story1&#47;1_rss.png"
          style={{ border: 'none' }}
           />
          </a>
        </noscript>
        <object className="tableauViz" style={{ display: 'none' }}>
        <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
        <param name="embed_code_version" value="3" />
        <param name="site_root" value="" />
        <param name="name" value="final_16862689625800&#47;Story1" />
        <param name="tabs" value="no" />
        <param name="toolbar" value="yes" />
        <param name="static_image" value="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;fi&#47;final_16862689625800&#47;Story1&#47;1.png" />
        <param name="animate_transition" value="yes" />
        <param name="display_static_image" value="yes" />
        <param name="display_spinner" value="yes" />
        <param name="display_overlay" value="yes" />
        <param name="display_count" value="yes" />
        <param name="language" value="en-US" />
        <param name="filter" value="publish=yes" />
      </object>
    </div>
  )
}
export default TableauVisualization
