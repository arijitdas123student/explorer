import React, { Component } from 'react'
import Sidebar, { SidebarHeader, SidebarScrollable } from './Sidebar'
import Hotspot from './Hotspot'
import Link from 'next/link'
import withSearchResults from '../SearchBar/withSearchResults'

const hotspotToObj = (hotspot) => ({
  ...hotspot,
  location: hotspot.geocode.longCity + ', ' + hotspot.geocode.shortState,
})

class HotspotSidebar extends Component {
  updateFilter = (e) => {
    this.props.updateSearchTerm(e.target.value)
  }

  render() {
    const {
      hotspots,
      count,
      selectedHotspots,
      selectHotspots,
      clearSelectedHotspots,
      fetchMoreHotspots,
      searchResults,
      searchTerm,
    } = this.props

    let hotspotsToShow = hotspots
    if (selectedHotspots.length > 0) {
      hotspotsToShow = selectedHotspots
    } else if (searchTerm !== '') {
      hotspotsToShow = (
        searchResults.find((r) => r.category === 'Hotspots')?.results || []
      ).map(hotspotToObj)
    }

    let titleText = 'Hotspots'
    if (selectedHotspots.length > 0) {
      if (selectedHotspots.length > 1) {
        titleText = 'Hotspots Selected'
      } else {
        titleText = 'Hotspot Selected'
      }
    }

    return (
      <span className="coverage-map-sidebar">
        <Sidebar>
          <SidebarHeader>
            {selectedHotspots.length > 0 ? (
              <div className="header-search">
                <span
                  className="header-go-back"
                  onClick={clearSelectedHotspots}
                >
                  <img src="/images/back.svg" className="header-back-img" />{' '}
                  Back
                </span>
                {selectedHotspots.length === 1 && (
                  <>
                    <Link href={`/hotspots/${selectedHotspots[0].address}`}>
                      <a target="_blank" className="header-view-details">
                        View Hotspot Details
                        <img
                          src="/images/back.svg"
                          className="header-fwd-img"
                        />{' '}
                      </a>
                    </Link>
                  </>
                )}
              </div>
            ) : (
              <div className="header-search">
                <input
                  type="search"
                  className="search"
                  placeholder="Hotspot Lookup"
                  value={searchTerm}
                  onChange={this.updateFilter}
                />
              </div>
            )}
            <div className="header-title-section">
              <span className="header-title">
                {selectedHotspots.length > 0 ? hotspotsToShow.length : count}
              </span>
              <span className="header-subtitle">{titleText}</span>
            </div>
          </SidebarHeader>

          <SidebarScrollable loadMore={fetchMoreHotspots}>
            {hotspotsToShow.map((hotspot) => (
              <div key={hotspot.address}>
                <Hotspot
                  key={hotspot.address}
                  hotspot={hotspot}
                  selectHotspots={selectHotspots}
                />
              </div>
            ))}
          </SidebarScrollable>
        </Sidebar>
        <style jsx>{`
          .header-search {
            margin-bottom: 20px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }

          .search {
            background: #2e314d;
            width: 100%;
            padding: 8px 10px;
            font-size: 14px;
            color: #a0b0c2;
            -webkit-appearance: none;
            border-radius: 6px;
            border: none;
            font-family: 'soleil', sans-serif;
          }

          @media screen and (max-width: 890px) {
            .search {
              font-size: 16px;
              /* So that pressing on the input field on a phone doesn't cause the UI to zoom in slightly */
            }
          }

          .search::placeholder {
            color: #a0b0c2;
            opacity: 1;
          }

          .header-title-section {
            display: flex;
            align-items: flex-end;
            padding-top: 10px;
          }

          .header-title {
            color: #29d391;
            font-size: 60px;
            font-weight: 500;
            margin-right: 10px;
            line-height: 48px;
            font-family: 'soleil';
            font-weight: 300;
            letter-spacing: -2px;
          }

          .header-subtitle {
            color: #a3a8e4;
            font-size: 16px;
            max-width: 200px;
            line-height: normal;
            font-family: 'soleil';
            font-weight: 300;
            position: relative;
            top: 4px;
          }

          .header-go-back {
            color: #a0b0c2;
            font-size: 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            width: 75px;
            padding: 6px 0;
          }

          .header-view-details {
            color: #a0b0c2;
            font-size: 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            padding: 6px 0;
          }

          .header-back-img {
            height: 10px;
            margin-right: 6px;
          }
          .header-fwd-img {
            height: 10px;
            margin-left: 6px;
            transform: rotate(180deg);
          }
        `}</style>
      </span>
    )
  }
}

export default withSearchResults(HotspotSidebar)
