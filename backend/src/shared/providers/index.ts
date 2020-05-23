import { container } from 'tsyringe'
import IStorageProvider from './StorageProviders/models/IStorageProvider'
import DiskStorageProvider from './StorageProviders/implementations/DiskStorageProvider'
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider'
import IMailProvider from './MailProvider/models/IMailProvider'
import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider'
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implemantations/HandlebarsMailTemplateProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
)

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider
)

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider)
)
