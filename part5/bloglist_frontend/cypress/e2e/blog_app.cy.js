describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user = {
      name: 'banjo',
      username: 'suckitgrunty',
      password: 'kazooie',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
    cy.visit('');
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
        cy.contains('Likes: 0')
        cy.contains('Likes: 0').parent().find('button').click()
        cy.contains('Likes: 1')
      });
      it('the user who created the blog is able to delete it', () => {
        cy.contains('Delete').click()
        cy.on('window:confirm', () => true)
        cy.get('html').should('not.contain', 'test blog');
      })
    });
  });
});
