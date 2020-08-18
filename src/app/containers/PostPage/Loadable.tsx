import { lazyLoad } from 'utils/loadable'

export const PostsPage = lazyLoad(
    () => import('./index'),
    (module) => module.PostsPage
)
