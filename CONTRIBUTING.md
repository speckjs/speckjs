# Contributing

## General Workflow - Based on the [Github workflow](https://guides.github.com/introduction/flow/)

1. Clone the repo
1. Create a branch from the development branch. - Your branch name should be descriptive (e.g., `feature/refactor-authentication`, `feature/user-content-cache-key`, `feature/make-retina-avatars`), so that others can see what is being worked on. Use the following naming conventions for branching:
  - feature/<name>
  - test/<name>
  - documentation/<name>
  - refactor/<name>
  - bug/<name>

1. Add commits to your feature branch. - Commit messages are important, by writing clear commit messages, you can make it easier for other people to follow along and provide feedback.

1. Open a Pull Request to the development branch. - Write the PR title in the format of `(feat) Implemented sign in authorization [Closes #<issue num>]` in order to have the [PR's sync with waffle.io](https://help.github.com/articles/closing-issues-via-commit-messages/)
1. Discuss and review your code. - Once a Pull Request has been opened, the person or team reviewing your changes may have questions or comments. Perhaps the coding style doesn't match project guidelines, the change is missing unit tests, or maybe everything looks great and props are in order. Pull Requests are designed to encourage and capture this type of conversation.
1. Development Merge - Once your pull request has been reviewed and the branch passes tests, the pull request can be merged into the development branch, to be tested into production.
1. Master Merge - Now that your changes have been verified in production, it is time to merge your code into the master branch. Once merged, Pull Requests preserve a record of the historical changes to your code. Because they're searchable, they let anyone go back in time to understand why and how a decision was made.
1. Remove the feature branch - Upon succesfully merge to master make sure to clean the relative branches from the published branches on origin.

Details and pro-tips about the Github workflow and branching strategies in general:

- [Github Workflow](https://guides.github.com/introduction/flow/)
- [A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/)

Thanks for contributing!

### Guidelines

1. Uphold the current code standard:
    - Keep your code [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).
    - Apply the [boy scout rule](http://programmer.97things.oreilly.com/wiki/index.php/The_Boy_Scout_Rule).
    - Follow the [Style guide](style-guide.md)
1. Run the tests `npm test` before submitting a pull request.
1. Tests are very, very important. Submit tests if your pull request contains
   new, testable behavior.

### Checklist:

This is just to help you organize your process

- [ ] Did you branch out of development? (never branch out from existing feature brances/master)
- [ ] Did I follow the correct naming convention for my branch?
- [ ] Is my branch focused on a single main change?
- [ ] Do all of my changes directly relate to this change?
- [ ] Did I write a clear pull request message detailing what changes I made?
- [ ] Did I get a code review?
- [ ] Did I make any requested changes from that code review?

If you follow all of these guidelines and make good changes, you should have
no problem getting your changes merged in.
