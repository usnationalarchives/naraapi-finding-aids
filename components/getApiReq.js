// MAP OF OBJECT
// apiReqObj = {
//   baseUrl: "https://catalog.archives.gov/api/v1",
//   resultType: oneOf['recordGroup', 'series', 'item'],
//   rows: number of rows,
//   cursorMark: string from api,
//   queryId: id from url,
//   filtered: boolean,
//   filterLocation: comma separated numbers
// }

// Cases:
// 2. Load more after initial page load
// 3. Filter initial page load
// 4. Filter page after load more
// 5. Filter intial page and then load more
// 6. Load more after initial page load and then filter
// 7. Filter on index and choose record group
// 8. Filter on record group and then choose series


export function getApiRequest(apiReqObj) {
  // 1. Initial page load
  const defaultBaseUrl = 'https://catalog.archives.gov/api/v1'
  const defaultRows = 50;
  const defaultCursorMark = '*';

  let apiLink  = (apiReqObj.baseUrl ? apiReqObj.baseUrl : defaultBaseUrl) + '?';
      apiLink += 'resultTypes=' + apiReqObj.resultType;
      apiLink += apiReqObj.rows ? ('&rows=' + apiReqObj.rows) : ('&rows=' + defaultRows);
      // Determined by local state and passed in.
      apiLink += apiReqObj.cursorMark ? ('&cursorMark=' + apiReqObj.cursorMark) : ('&cursorMark=' + defaultCursorMark);
  // End intial Page load, cursor location not set yet.

  // Ask for correct type of information
  if(apiReqObj.resultType) {
    switch(apiReqObj.resultType) {
      case 'recordGroup':
        break;
      case 'series':
        apiLink += '&description.series.parentRecordGroup.recordGroupNumber=' + apiReqObj.queryId;
        break;
      case 'item':
        apiLink += '&description.item.parentSeries.naId_is=' + apiReqObj.queryId;
        break;
    }
  }

  // Next check for filters
  if(apiReqObj.filtered) {
    // Check for location filter
    if(apiReqObj.filterLocation) {
      
      switch(apiReqObj.resultType) {
        case 'recordGroup':
          apiLink += '&description.recordGroup.referenceUnits.referenceUnit.naId=' + apiReqObj.filterLocation;
          break;
        case 'series':
          apiLink += '&description.series.physicalOccurrenceArray.seriesPhysicalOccurrence.referenceUnitArray.referenceUnit.naId=' + apiReqObj.filterLocation
          break;
        case 'item':
          apiLink += '&description.item.physicalOccurrenceArray.itemPhysicalOccurrence.referenceUnitArray.referenceUnit.naId=' + apiReqObj.filterLocation
          break;
      }
    }
  }

  return apiLink;
}