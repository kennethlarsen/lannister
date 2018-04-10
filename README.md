# lannister
[![Build Status](https://travis-ci.org/kennethlarsen/lannister.svg?branch=master)](https://travis-ci.org/kennethlarsen/lannister)
[![Coverage Status](https://coveralls.io/repos/github/kennethlarsen/lannister/badge.svg?branch=master)](https://coveralls.io/github/kennethlarsen/lannister?branch=master)


A Lannister always pays his technical debt

![Keep calm and alwyas pay your debts](https://boomerandecho.com/wp-content/uploads/2014/04/Keep-Calm.jpg)

This is still in the early stages. Basically, I like the idea of auto generating a list of potential technical debt in a code base. 

## Install
`npm install -g lannister`

## Usage

`lannister src/` runs the the technical debt check on dir src/ and returns a report.md at current path.

If you want to change the path of the report.md you can use the output flag (`-o`) to change this.

`lannister src/ -o reports/`

Do this before your sprint planning sessions and remember to pay your technical debt in every sprint. If not, the Iron Bank will kill you.
 
## Current rules
* too-many-args: more than 4 args in a function
* too-long/file-too-long: file length more than 250 lines
* todo-comment: TODO comment found in code
