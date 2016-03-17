Skills for Australia .com

##To run the project open the parent directory and run 

$ jekyll serve

Jekyll allows cthe use of shared/common assets and yaml data files. Running the serve command will compile all .scss and template files, writing the compiled pages to the _site directory which is then served up at http://127.0.0.1:4000/

##To deploy to the AWS S3 bucket

Login to the AWS cli tools, and connect to the account using details as provided by Nick Ng (AuIT)

Then run from the _site directory:

$ aws s3 sync . s3://www.skillsforaustralia.com/