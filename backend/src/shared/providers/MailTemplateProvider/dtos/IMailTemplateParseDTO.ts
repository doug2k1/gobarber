export default interface IMailTemplateParseDTO {
  file: string
  variables: {
    [key: string]: string | number
  }
}
