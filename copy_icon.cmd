set _project_dir=.

if [%3] NEQ [] (set _prject_dir=%3)

xcopy %1\drawable-ldpi\%2 %_project_dir%\App_Resources\Android\src\main\res\drawable-ldpi\ /i
xcopy %1\drawable-hdpi\%2 %_project_dir%\App_Resources\Android\src\main\res\drawable-hdpi\ /i  
xcopy %1\drawable-mdpi\%2 %_project_dir%\App_Resources\Android\src\main\res\drawable-mdpi\ /i  
xcopy %1\drawable-xhdpi\%2 %_project_dir%\App_Resources\Android\src\main\res\drawable-xhdpi\ /i 
xcopy %1\drawable-xxhdpi\%2 %_project_dir%\App_Resources\Android\src\main\res\drawable-xxhdpi\ /i
xcopy %1\drawable-xxxhdpi\%2 %_project_dir%\App_Resources\Android\src\main\res\drawable-xxxhdpi\ /i