
/*
	This file stores the compiler/interpretor details that are provided to DockerSandbox.sh	by the app.js
	The index is the key field,
	First column contains the compiler/interpretor that will be used for translation
	Second column is the file name to use when storing the source code
	Third column is optional, it contains the command to invoke the compiled program, it is used only for compilers
	Fourth column is just the language name for display on console, for verbose error messages
	Fifth column is optional, it contains additional arguments/flags for compilers

	You can add more languages to this API by simply adding another row in this file along with installing it in your
	Docker VM.

	Author: Osman Ali
	Date: 3 - JUN - 2014
	*Revised on: 30th June 2014 (Added Column number 4 to display the name of languages to console)
*/

exports.compilerArray= [ ["python","file.py","","Python",""],
			 ["ruby","file.rb","","Ruby",""],
			 ["clojure","file.clj","","Clojure",""],
			 ["php","file.php","","Php",""],
			 ["nodejs","file.js","","Nodejs",""],
			 ["scala","file.scala","","Scala",""],
			 ["\'go run\'","file.go","","Go",""],
			 ["\'g++ -o /usercode/a.out\' ","file.cpp","/usercode/a.out","C/C++",""],
			 ["javac","file.java","\'./usercode/javaRunner.sh\'","Java",""],
			 ["\'vbnc -nologo -quiet\'","file.vb","\'mono /usercode/file.exe\'","VB.Net",""],
			 ["\'gmcs /unsafe\'","file.cs","\'mono /usercode/file.exe\'","C#",""],
			 ["/bin/bash","file.sh"," ","Bash",""],
			 ["gcc ","file.m"," /usercode/a.out","Objective-C","\' -o /usercode/a.out -I/usr/include/GNUstep -L/usr/lib/GNUstep -lobjc -lgnustep-base -Wall -fconstant-string-class=NSConstantString\'"],
			 ["/usercode/sql_runner.sh","file.sql","","MYSQL",""],
			 ["perl","file.pl","","Perl",""],
			 ["php","file.php","","Php",""],// 15 php53
			 ["php","file.php","","Php",""],// 16 php54
			 ["php","file.php","","php",""],// 17 php56
			 ["php","file.php","","Php",""],// 18 php7
			 ["python","file.py","","Python",""],
			 ["python3","file.py","","Python",""],
		  ];


			exports.imageArray= [
			      ["index.alauda.cn/fcsystem/compilebox"],
			      ["index.alauda.cn/fcsystem/compilebox"],
			      ["index.alauda.cn/fcsystem/compilebox"],
			      ["index.alauda.cn/fcsystem/compilebox"],
			      ["index.alauda.cn/fcsystem/compilebox"],
			      ["index.alauda.cn/fcsystem/compilebox"],
			      ["index.alauda.cn/fcsystem/compilebox"],
			      ["index.alauda.cn/fcsystem/compilebox"],
			      ["index.alauda.cn/fcsystem/compilebox"],
			      ["index.alauda.cn/fcsystem/compilebox"],
			      ["comp"], //10
			      ["index.alauda.cn/fcsystem/compilebox"],
			      ["index.alauda.cn/fcsystem/compilebox"],
			      ["index.alauda.cn/fcsystem/compilebox"],
			      ["index.alauda.cn/fcsystem/compilebox"],
			      ["fcdexec/php53x"], //15
						["fcdexec/php54x"], //16
						["fcdexec/php56x"], //17
						["fcdexec/php7x"], //18
						["fcdexec/python27"], //19
						["fcdexec/python27"], //20
					  ];
