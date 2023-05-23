let ghpages = require('gh-pages');

ghpages.publish(
    'dist', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/kpekk/kpekk.github.io.git', // Update to point to your repository  
        user: {
            name: 'Kristjan Pekk', // update to use your name
            email: 'kristjan.pekk@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)