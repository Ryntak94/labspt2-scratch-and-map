# Scratch & Map

Oh, the places you've gone! And the adventures that are still ahead of you! Travel can make the world feel smaller, but also more grand and beautiful—which is exactly how this interactive art presents it.

### Prerequisites

You will need to install [Python](wwww.python.org) and [pip](https://pip.pypa.io/en/stable/installing/).

If you are running a version of Python older than 3.4, you will also need to install [virtualenv](https://virtualenv.pypa.io/en/latest/installation/)

.env files are not included in the repository. Please contact a dev team member for access.

### Installing

1. For Python 3.4 or newer:
   Run ```python3 -m venv venv```.

For versions of Python older than 3.4, see above for virtualenv installation.

Continuing for all versions:

2. Run ```virtualenv venv```

3. Mac - Run ```source venv/bin/activate```
   Windows - Run ```venv\Scripts\activate```

4. Run ```pip install -r requirements.txt```


## Getting Started

Start backend server with command: python server.py in root directory of project.

Start frontend server with command: yarn start in root of frontend folder.

## Running the tests

From the root folder, within the virtual environment, run:
```
pytest  -v  --setup-show tests
```

Netlify predeployment tests run with each PR.

### Break down into end to end tests

conftest.py - creates new instances of data for use in test cases within test_models.py

test_models.py - tests for correct table schema

<!-- ### And coding style tests

Explain what these tests test and why

```
Give an example
``` -->

## Deployment

Deployed via Heroku and Netlify. [www.scratchandmap.club](www.scratchandmap.club)

## Built With

[Python](www.python.org)
[Flask](http://flask.pocoo.org/)
[React](www.reactjs.org)
[Semantic UI React](https://react.semantic-ui.com/)

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use date of release for versioning (YY.MM). Current version [Version 19.05](https://github.com/Lambda-School-Labs/labspt2-scratch-and-map). 

## Authors
<table style="border-collapse: collapse;"><tr style="border: none;"><td style="border: none;">
<center><img src="https://github.com/Lambda-School-Labs/labspt2-scratch-and-map/blob/master/scratch-and-map-front-end/src/img/abi.png?raw=true" width="150"/><br> [Abi Franklin](https://github.com/AbiFranklin)</center>
</td><td style="border: none;">
<center><img src="https://github.com/Lambda-School-Labs/labspt2-scratch-and-map/blob/master/scratch-and-map-front-end/src/img/brandon.png?raw=true" width="150"/><br> [Brandon Moll](https://github.com/BrandonMoll)</center>
</td><td style="border: none;">
<center><img src="https://github.com/Lambda-School-Labs/labspt2-scratch-and-map/blob/master/scratch-and-map-front-end/src/img/courtney.png?raw=true" width="150"/><br> [Courtney Buratto](https://github.com/cocoitali)</center>
</td></tr><tr style="border: none;"><td style="border: none;">
<center><img src="https://github.com/Lambda-School-Labs/labspt2-scratch-and-map/blob/master/scratch-and-map-front-end/src/img/javier.png?raw=true" width="150"/><br>  [Javier Alvarez](https://github.com/jalvarez2020)</center>
</td><td style="border: none;">
<center><img src="https://github.com/Lambda-School-Labs/labspt2-scratch-and-map/blob/master/scratch-and-map-front-end/src/img/pascale.png?raw=true" width="150"/> <br> [Pascale Pierre](https://github.com/PSquared0)</center>
</td><td style="border: none;">
<center><img src="https://github.com/Lambda-School-Labs/labspt2-scratch-and-map/blob/master/scratch-and-map-front-end/src/img/ryan.png?raw=true" width="150"/> <br>[Ryan Matthews](https://github.com/ryntak94)</center></td></tr></table>

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

@gakko1 - Thank you for being at our beck and call.
F.J. - Thank you for your guidance and cheerleading.
