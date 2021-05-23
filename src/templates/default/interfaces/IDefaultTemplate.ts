import ITemplate from '../../../interfaces/ITemplate';

export default interface IDefaultTemplate extends ITemplate {
  configuration: {
    background: Function

    /**
     * Number of items to display, the rest will be hidden and displayed
     * when you click on the button (for the same number of elements)
     * 0 - display all
     */
    githubRepositoriesMore: number
  }
}
