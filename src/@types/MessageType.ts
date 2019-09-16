export default interface Message {
  id: string,
  threadId: string,
  snippet ?: string,
  labelIds: string[],
  payload: {
    body: any,
      headers: {
      name: string,
        value: string,
        } [],
      parts: {
      mimeType: string,
        partId: string,
          body: {
        data: string,
          size: number,
          },
      headers: {
        name: string,
          value: string,
          } []
    } []
  }
}