GitHub.prototype.getRepos = function(name) {
  $.get('https://api.github.com/users/' + name + '/repos?access_token=' + apiKey).then(function(response){
    console.log(response[0].name);
    console.log(response[0].description);
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

exports.githubModule = GitHub;
Contact GitHub API Training Shop Blog About
