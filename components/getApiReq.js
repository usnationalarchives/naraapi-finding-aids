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

export function getApiRequest(apiReqObj) {
  const defaultBaseUrl = 'https://catalog.archives.gov/api/v1'
  const defaultRows = 50;
  const defaultCursorMark = '*';

  let apiLink = (apiReqObj.baseUrl ? apiReqObj.baseUrl : defaultBaseUrl) + '?';
  apiLink += 'resultTypes=' + apiReqObj.resultType;
  apiLink += apiReqObj.rows ? ('&rows=' + apiReqObj.rows) : ('&rows=' + defaultRows);
  apiLink += apiReqObj.cursorMark ? ('&cursorMark=' + apiReqObj.cursorMark) : ('&cursorMark=' + defaultCursorMark);

  if(apiReqObj.resultType === 'recordGroup') {
    console.log(apiReqObj)
    if(apiReqObj.filtered === true && apiReqObj.filterLocation) {
      
      apiLink += '&description.recordGroup.referenceUnitArray.referenceUnit.naId=' + apiReqObj.filterLocation;
      console.log(apiLink)
    }
  }

  if(apiReqObj.resultType === 'series') {
    apiLink += '&description.series.parentRecordGroup.recordGroupNumber=' + apiReqObj.queryId;
    if(apiReqObj.filtered === true && apiReqObj.filterLocation) {
      apiLink += '&description.series.physicalOccurrenceArray.seriesPhysicalOccurrence.referenceUnitArray.referenceUnit.naId=' + apiReqObj.filterLocation
    }
  }

  if(apiReqObj.resultType === 'item') {
    apiLink += '&description.item.parentSeries.naId_is=' + apiReqObj.queryId;
    if(apiReqObj.filtered === true && apiReqObj.filterLocation) {
      apiLink += '&description.series.physicalOccurrenceArray.seriesPhysicalOccurrence.referenceUnitArray.referenceUnit.naId=' + apiReqObj.filterLocation
    }
  }

  console.log(apiReqObj.filtered, apiReqObj.filterLocation)
  console.log(apiLink)

  return apiLink;
}