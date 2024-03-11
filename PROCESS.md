## Documentation on story creation and assignment at EACH iteration (one option is to include screenshots of kanban board).
![alt text](https://github.com/mmandelb2201/finance-bot/blob/main/img/KanBan%20board%20v1.JPG)
KanBan Board 1
![alt text](https://github.com/mmandelb2201/finance-bot/blob/main/img/KanBan%20board%20v2.JPG)
KanBan Board 2
![alt text](https://github.com/mmandelb2201/finance-bot/blob/main/img/KanBan%20Board%20v3.JPG)
KanBan Board 3
![alt text](https://github.com/mmandelb2201/finance-bot/blob/main/img/KanBan%20board%20v4.JPG)
KanBan Board 4
![alt text](https://github.com/mmandelb2201/finance-bot/blob/main/img/KanBan%20board%20v5.JPG)
KanBan Board 5

### User Stories
1. Someone who is looking for recommendations on how to improve their financial situation. So that they can live more comfortably and have money saved for emergencies and retirement.  
Complexity: 8

2. A user wants to understand their financial standings better. They want to have their data visualized, in order to see their situation in a different and informative light. 
Complexity: 5

3. Someone who wants to see how they spend money and have it be categorized by where it is spent. To see how they can change their habits to invest. 
Complexity: 3

4. Someone who wants to organize their finances. To be able to make big financial decisions easier and see what changes they need to make. 
Complexity: 1

---
## Any scrum meeting notes.
---
#### Meeting 2/18
- Created Minimum Viable Product:
- Aggregate a persons different finances into one place
- Add data visualization for a persons finances
- Give suggestins about budgeting
---
#### Meeting 3/10
- Created User Stories
- Ranked user stories based on complexity
- Developers assigned themselves to a desired user story  
---
#### Meeting 3/17
- Began discussing how to implement the bot logic
- Detailed how the user, account, and transaction objects would act
- Discussed how to display data to the user
- Mikayla to look into data visualization
- Matt to begin detailing how the bot will work and create documentation
- Dylan to look into remotely hosting the bot
- Jack to research more healthy budgeting habits to include in the bot
---
#### Meeting 3/24
- Went over how the bot will work to ensure all members understand the bot logic and how the objects interact with each other
- Split up more specific tasks for development for the first iteration
---
#### Meeting 4/10
- Discussed through details on different account types and their pros/cons
- Savings, Money Market, CD, Roth/Trad IRAs, 401ks
---
#### Meeting 4/16
- Formulated different object types, their purpose and the specifics of their parameters
- Bank Account, Retirement Bank Account, Transaction, Recurring Transactions and User
---
#### Meeting 4/20
- Firebase configurations
- Firestore converters to user object
---

## Include documentation of EACH iteration end. Include status of completed and incomplete tasks, and a process reflection.


### Iteration 1: Mar 28 - Apr 10


#### Matt

###### Completed Tasks - Completed making basic objects such as the user, transaction, and bank account.

###### Incomplete tasks - Started making the suggestion bots for account suggestions, retirement suggestions, and spending suggestions.

###### Process Reflection - A couple of things helped making the objects simpler. First, was making detailed documentation before we started developing. Since finances can be extremely complicated, we needed to do things in a specific way to make development easier. Therefore, many document were made detailing how the objects would be made and how they would be used. This allowed for good, consistent development. Also, documenting specifically what the bot would look for about the user was extremely helpful. For example, we would look to see if the user spent more than 30% of their income to wants, to which we had recomendations lined up to give the user if that was the case. Overall, this iteration showed the importance of detailed diagrams and documentation.

###### Completed Tasks - created the framework for a user login and signup

###### Incomplete tasks - create framework for user to imput financial information, create componant for adding suggestions

###### Process Reflection - Slowly got better at using react with creating the login and signup. Still learning a lot about react trying to implement bootstrap is a little difficult but there is no doubt that it has made things easier its just a matter of getting used to and understanding the syntax. Overall however it is very apparent that if I wish to continue doing bootstrap in order to develop components that are more stylish and useful.

#### Mikayla

###### Completed Tasks -  created basic header with logo and bootstrap dropdown component with simple styling. Dropdown had various user actions, and was able to redirect them to those pages. 

###### Incomplete tasks -  Intended to create skeleton for home page, that would show account balances, financial suggestions as well as a categorized graphic of the user’s financial monthly spending. 

###### Process Reflection - The group emphasized the power of react-bootstrap, and it revolutionized the way i go about creating websites; incredibly easier and more powerful substitute for hard-coded html bodies. My time management on this sprint was handled very well, and it a standard I would like to keep. 

#### Jack

###### Completed Tasks - Added login and signup features to the website

###### Incomplete Tasks - Still need to add suggestions component and expenses form

###### Process Reflection - Getting used to using react components, and trying to understand how props work with databases. Trying to start using bootstrap and its weird and unfamiliar but without a doubt powerful as it makes the css styling so much easier to create and understand but I constantly find myself looking back on the documentation for bootstrap.

#### Dylan

###### Completed Tasks - Set up firebase project and integrate firebase into bot application. Use Firebase's Cloud Firestore to store user information. Create functions to wrap backend-as-a-service functionality to get objects that will be visualized as financial data.

###### Incomplete tasks - Intended to fully integrate react-bootstrap and react-hook-form modules to leverage bootstrap defined components and simple, but effective form handling. Integration of libraries to make styling easier and more streamlined.

###### Process Reflection - Reading documentation of the modules is important as certain solutions for problems had during development could be solved from using react-bootstrap components such as the Form component and its children. Using react-hook-form, would make form-handling processes such as registering fields and submission easier.


### Iteration 2: Apr 11 - Apr 24


#### Matt

###### Completed Tasks - Completed suggestion generators and the bot as a whole. The bot now effectively takes a look at user financial data and returns suggestions on how they can improve.

###### Incomplete tasks - There are a couple of bugs in the bot and a couple of non-core functions that do not work as intended as of right now. Some of the website styling needs to be updated.

###### Process Reflection - The big lesson I took away from this is the importance of testing as you are developing. Near the end of the iteration, much of the time was spent testing the bot. A lot of the bugs should have been fixed sooner. They problably would have been fixed sooner if we had been testing sooner. Because of this, unnecesarry stuff about the website such as styling and remote database functionality were put on the backburner. Other than that, the documentation again was very userful for consitent, clear development between the entire team. 

#### Jack

###### Completed Tasks - Completed expenses form and suggestions component

###### Incomplete tasks - Need to re-stylize them and revamp them to be prettier and cleaner

###### Process Reflection - Deffinitly got more used to using react and bootstrap and have overall become better at using both. Still need more practice but overal happy with the results. Occasionally my github knowledge would fail me but I was able to get what I needed done done. 

#### Mikayla

###### Completed Tasks -  Imported and catered a data visualization program to import user data from firebase and automate a graphic that reflects said data in a pie chart showed on the front page.  Also helped with general consistency of styling throughout the site.

###### Incomplete tasks - Was planning on helping with the login/sign up pages but spent almost all of my time rendering the graphic. The site had various bugs, as mentioned by my groupmates, and I also wanted to contribute more to these corrections before deployment.

###### Process Reflection - Above all, the biggest takeaway from this last sprint was I wish that I had a stronger knowledge of GitHub. Much of my time was spent fixing dependency and other compilation issues, mostly because of inconsistencies on my end. I believe if I had a stronger knowledge of the continuous integration process via GitHub, I could’ve compared pulled with our main branch more and that would’ve alleviated many of my struggles. I learned there is much more I need to learn.  

#### Dylan

###### Completed Tasks - Fully integrate react-bootstrap and react-hook-form in sign up and login pages. Connect suggestions and other bot services with firebase.

###### Incomplete tasks - Planned on changing code syntax throughout project to conform to eslint warnings. Also, wanted to contribute with CSS styling.

###### Process Reflection - Taking greater initiative in communicating about consistent code style and keep code up to date comes a long way. Sometimes, I would see older javascript not conforming to es6: using var instead of const and let. Also, sometimes I would see React code that does not utilize the power of version 18.x. I should be more outspoken about these issues even though they may not be application breaking.  
