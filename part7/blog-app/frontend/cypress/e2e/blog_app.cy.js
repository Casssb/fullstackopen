describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    cy.createUser({
      username: 'suckitgrunty',
      name: 'banjo',
      password: 'kazooie',
    });
  });

  it('front page can be opened', () => {
    cy.contains('Blogs');
    cy.contains('Username');
    cy.contains('login');
  });
  it('login form can be opened', () => {
    cy.contains('login').click();
  });
  it('user can log in with correct username/password', () => {
    cy.contains('login').click();
    cy.get('#username').type('suckitgrunty');
    cy.get('#password').type('kazooie');
    cy.get('#login').click();

    cy.contains('banjo logged in');
  });
  it('login fails with wrong password', () => {
    cy.contains('login').click();
    cy.get('#username').type('suckitgrunty');
    cy.get('#password').type('jinjo');
    cy.get('#login').click();

    cy.contains('401: incorrect username or password');

    cy.get('html').should('not.contain', 'banjo logged in');
  });

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'suckitgrunty', password: 'kazooie' });
    });

    it('a new blog can be created', () => {
      cy.contains('new blog').click();
      cy.get('#title').type('test blog');
      cy.get('#author').type('cypress');
      cy.get('#url').type('localhost.com');
      cy.contains('Create blog').click();

      cy.contains('New blog added: test blog by cypress');
    });

    describe('a blog exists', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'test blog',
          author: 'cypress',
          url: 'localhost.com',
        });
      });

      it('likes will increment when likes button clicked', () => {
        cy.contains('show').click();
        cy.contains('Likes: 0');
        cy.contains('Likes: 0').parent().find('button').click();
        cy.contains('Likes: 1');
      });
      it('the user who created the blog is able to delete it', () => {
        cy.contains('Delete').click();
        cy.on('window:confirm', () => true);
        cy.get('html').should('not.contain', 'test blog');
      });
      it('A user who did not create the blog cannot delete it (there should be no delete button)', () => {
        cy.contains('Log out').click();
        cy.createUser({
          username: 'winkybunion',
          name: 'grunty',
          password: 'jinjo',
        });
        cy.login({ username: 'winkybunion', password: 'jinjo' });
        cy.contains('show').click();
        cy.get('html').should('not.contain', 'Delete');
      });
      describe('when there are many blogs', () => {
        beforeEach(() => {
          cy.createBlog({
            title: 'blog 2',
            author: 'cypress',
            url: 'localhost.com',
            likes: 1,
          });
          cy.createBlog({
            title: 'blog 3',
            author: 'cypress',
            url: 'localhost.com',
            likes: 2,
          });
          cy.createBlog({
            title: 'blog 4',
            author: 'cypress',
            url: 'localhost.com',
            likes: 3,
          });
        });
        it('Blogs are sorted by number of likes (with most likes at the top)', () => {
          cy.get('[data-test-id="show-button"]')
            .should('have.length', 4)
            .click({ multiple: true });
          
            cy.get('[data-test-id="likes-display"]').eq(0).should('contain', 'Likes: 3')
            cy.get('[data-test-id="likes-display"]').eq(1).should('contain', 'Likes: 2')
            cy.get('[data-test-id="likes-display"]').eq(2).should('contain', 'Likes: 1')
            cy.get('[data-test-id="likes-display"]').eq(3).should('contain', 'Likes: 0')
        });
      });
    });
  });
});
