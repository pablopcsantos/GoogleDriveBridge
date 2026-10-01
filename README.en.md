# GoogleDriveBridge

Read this in other languages: [Português](README.md)

Web utility built with **Google Apps Script** to recursively copy files and subfolders between two Google Drive folders through a simple HTML interface.

## Features

- accepts the IDs of the source and destination folders;
- recursively traverses files and subfolders in the source;
- creates missing subfolders in the destination;
- avoids copying a file again when a file with the same name and an equal or larger size already exists in the destination;
- replaces smaller files with the same name found in the destination;
- stops each cycle before the configured execution-time limit and automatically requests a new cycle through the web interface;
- reports execution, completion, and error states in the interface.

## Project structure

- `Código.gs`: Google Apps Script backend responsible for serving the interface and performing the recursive copy operation in Google Drive.
- `Index.html`: web interface used to enter folder IDs, start the copy operation, and monitor its status.

## How to use it with Google Apps Script

This tutorial is written for users who have never used Google Apps Script before.

### 1. What you need before you start

You will need:

- a Google account;
- access to the source and destination folders in Google Drive;
- the `Código.gs` and `Index.html` files from this repository;
- a browser signed in to the same Google account that has access to the folders.

> **Important:** the project operates with the permissions granted to the Google Apps Script deployment. Do not use folder IDs for folders that the account responsible for execution cannot access.

### 2. Create a new Google Apps Script project

1. Go to [https://script.google.com/](https://script.google.com/) and sign in with your Google account.
2. Click **New project**.
3. In the upper-left corner, click **Untitled project** and rename it to something such as `GoogleDriveBridge`.
4. Apps Script will automatically create a script file, usually named `Code.gs` or `Código.gs`, depending on the interface language.

### 3. Add the backend code

1. Open the `Código.gs` file from this repository.
2. Copy all of its contents.
3. In the Google Apps Script editor, select the script file that was created automatically.
4. Delete the example code.
5. Paste the contents of the repository's `Código.gs` file.
6. Save the project with **Ctrl + S** or the save button.

The script file may be named `Código.gs`, `Code.gs`, or something else. The project does not depend on that filename.

### 4. Create the HTML interface file

This filename is important because the backend specifically looks for a file named `Index`.

1. In the left sidebar of Apps Script, click the **+** button next to **Files**.
2. Choose **HTML**.
3. Enter exactly:

   ```text
   Index
   ```

   Apps Script will automatically add the `.html` extension.
4. Open the `Index.html` file from this repository.
5. Copy all of its contents.
6. Delete the contents of the newly created HTML file in Apps Script and paste the repository code.
7. Save the project again.

At this point, the project should contain at least:

```text
Código.gs
Index.html
```

### 5. Deploy the project as a web app

Google Apps Script must be deployed as a **Web app** so the interface can be opened in a browser.

1. In the upper-right corner of the editor, click **Deploy**.
2. Choose **New deployment**.
3. Next to **Select type**, click the gear icon.
4. Select **Web app**.
5. In **Description**, you may enter something such as:

   ```text
   GoogleDriveBridge - first deployment
   ```

6. Under **Execute as**, for personal use, select the option that runs the application as **you**, meaning the project owner.
7. Under **Who has access**, choose the most restrictive option compatible with your use case. For personal use, prefer access limited to you or your account.
8. Click **Deploy**.

If the project will be shared with other people, carefully review the **Execute as** and **Who has access** settings because they determine which Google Drive permissions are used during execution.

### 6. Authorize access to Google Drive

On the first deployment or first execution, Google may request authorization.

1. Click **Authorize access** or **Review permissions** if that screen appears.
2. Select the Google account that has access to the folders you will use.
3. Read the requested permissions.
4. Authorize them only if you are running a copy of the project that you created and whose code you have reviewed.

Depending on the account and project configuration, Google may warn that the application has not gone through a public verification process. This may happen with personal Apps Script projects. Proceed only if you are using your own copy of the code and understand the requested permissions.

After authorization, Apps Script will display the **web app URL**. Save this URL; you will use it to open GoogleDriveBridge.

### 7. How to get a Google Drive folder ID

GoogleDriveBridge does not use the folder name. It requires the **folder ID**, which is a unique identifier included in the Google Drive URL.

#### Example

Suppose the folder URL is:

```text
https://drive.google.com/drive/folders/1AbCDeFGhijkLMNopQRstuVWXyz123456?usp=drive_link
```

The ID is only the part after `/folders/` and before any `?`:

```text
1AbCDeFGhijkLMNopQRstuVWXyz123456
```

#### To get the source folder ID

1. Open [Google Drive](https://drive.google.com/).
2. Open the folder that contains the files you want to copy.
3. Click the browser address bar.
4. Find the part of the URL that comes after:

   ```text
   /folders/
   ```

5. Copy only the folder identifier.

#### To get the destination folder ID

Repeat the same process:

1. Open the folder that should receive the copied files.
2. Copy the identifier that appears after `/folders/`.
3. If the URL ends with parameters such as `?usp=drive_link`, **do not copy that part**.

> **Warning:** use the ID of a **folder**, not the ID of an individual file. The account running the application must have sufficient permission to read the source and create files and folders in the destination.

### 8. Start the copy operation

1. Open the web app URL provided by Apps Script.
2. In **Source Folder ID**, paste the ID of the folder to be copied.
3. In **Destination Folder ID**, paste the ID of the folder that should receive the files.
4. Click **Start Copy**.

The interface will display messages showing the progress of the operation.

When execution approaches the configured internal limit, the backend will end that cycle and the interface will automatically start another one.

> **Do not close the browser tab while the copy is running.** Automatic continuation depends on the open page to start the next cycle.

### 9. What happens during automatic continuation

When a new cycle starts, the project traverses the source folder structure again.

To reduce duplicate copying, it checks whether the destination already contains a file with:

- the same name; and
- an equal or larger size.

If it finds a file with the same name but a smaller size, the smaller file is moved to the trash and a new copy is created.

This approach allows successive cycles to continue the operation without requiring the user to manually track the exact point where the previous cycle stopped.

> Comparison is based on **name and size**, not file contents or hashes. Therefore, two different files with exactly the same name and size may be treated as equivalent by the project.

### 10. How to update the web app after changing the code

A published Apps Script deployment uses a specific version of the project. After changing the code, save the changes and update the deployment:

1. Click **Deploy**.
2. Choose **Manage deployments**.
3. Select the GoogleDriveBridge deployment.
4. Click the edit icon.
5. Under **Version**, choose **New version**.
6. Click **Deploy** again.

When an existing deployment is updated this way, you can normally continue using the same web app URL.

### 11. Common problems

#### “Folder not found” or access error

Check whether:

- the supplied ID really belongs to a folder;
- `?usp=drive_link` or another parameter was accidentally copied together with the ID;
- the account running the application has access to the folder;
- you accidentally copied a file ID instead of a folder ID.

#### The page does not open or says that `Index` does not exist

Confirm that the HTML file was created with the exact name:

```text
Index
```

The backend uses `HtmlService.createHtmlOutputFromFile('Index')`, so the name must match exactly.

#### The code was changed, but the web app still shows the old version

Save the project and update the deployment under **Deploy > Manage deployments**, selecting a **New version**.

#### The copy stopped after the browser tab was closed

Automatic continuation is controlled by the interface running in the browser. If the tab is closed, a new cycle will not start automatically. Open the application again and start the operation once more; files considered already copied will be skipped according to the name-and-size check.

#### Files with the same name

The project handles files with the same name based on size. It does not compare the actual file contents. Read the **What happens during automatic continuation** section before using the tool with folders that may contain different files with identical names and sizes.

### 12. Security recommendations

- Deploy your own copy of the project in your own Google account.
- Review the code before granting access to Google Drive.
- For personal use, keep **Who has access** set to the most restrictive option available.
- Do not share the URL of a deployment that runs with your account permissions unless you understand the consequences of that configuration.
- Test the tool first with two small folders that do not contain important files.
- Verify the result before using the tool with large amounts of data.

## 👤 Authorship and development

Web utility independently developed by **Pablo Phillipe Cândido dos Santos**, intended for recursively copying files and subfolders between directories in Google Drive. The project combines an HTML interface with Google Apps Script routines and divides long-running operations into successive cycles to reduce the risk of interruption due to execution-time limits.

Generative artificial intelligence tools were used as supporting resources during development, while responsibility for the project's conception, implementation, integration, and verification remained with the author.

Lattes CV: [http://lattes.cnpq.br/9500873674712528](http://lattes.cnpq.br/9500873674712528)
