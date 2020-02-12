declare const rxjs: any;

interface GoogleBooks {
    kind: string;
    totalItems: number;
    items: [];
}
interface BookThumbnails {
    smallThumbnail: string;
    thumbnail: string;
}
interface VolumeInfo {
    title: string;
    authors: [];
    description: string;
    imageLinks: BookThumbnails;
    language: string;
    previewLink: string;
    infoLink: string;
    categories: [];
}
interface Book {
    title: string
    description: string
    authors: []
    categories: []
    thumbnail: string
    previewLink: string
}
interface BookItem {
    volumeInfo: VolumeInfo
    id: string
}

function getDescription(desc: string) {
    if (typeof desc === "undefined")
        return '';
    else
        return desc.substring(0, 20);
}


function displayBook(book: Book) {
    const bookTpl = ` <div class="card mb-4 shadow-sm">
                            <img src="${book.thumbnail}" title="${book.title}" alt="${book.title}">
                            <div class="card-body">
                            <h4>${book.title}</h4>
                            <a href="${book.previewLink}" target="_blank">Preview</a><br>
                                <p class="card-text">${getDescription(book.description)}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                                    </div>
                                    <small class="text-muted">9 mins</small>
                                </div>
                            </div>
                        </div>
                    </div>`;
    const div = document.createElement('div');
    const books = document.querySelector('#books');;
    div.setAttribute('class', 'col-md-3');
    div.innerHTML = bookTpl;
    if (books) {
        books.appendChild(div);
    }

}

function showTotal(total: number) {
    const found = document.querySelector('#found');
    if (found) {
        found.textContent = '' + total;
    }
}

function getBooks(booktitle: string) {
    const { from } = rxjs;
    const { map, switchMap, tap } = rxjs.operators;
    const apiurl = 'https://www.googleapis.com/books/v1/volumes?q=';

    const p = fetch(apiurl + booktitle).then(res => res.json());

    return from(p).pipe(
        tap((data: GoogleBooks) => showTotal(data.totalItems)),
        switchMap((data: GoogleBooks) => from(data.items || [])),
        map((ele: BookItem) => {
            const book: Book = {
                title: ele.volumeInfo.title,
                categories: ele.volumeInfo.categories,
                authors: ele.volumeInfo.authors,
                description: ele.volumeInfo.description,
                thumbnail: ele.volumeInfo.imageLinks ? ele.volumeInfo.imageLinks.thumbnail : '',
                previewLink: ele.volumeInfo.previewLink
            };
            return book;
        }
        ), tap((ele: Book) => console.log(ele.previewLink))
    )

}

function cleanBooks() {
    const books = document.querySelector('#books');

    if (books) {
        books.innerHTML = '';
    }
    showTotal(0);

}

function searckBooks() {
    const searchEle = document.querySelector('#search');
    const { fromEvent } = rxjs;
    const { filter, map, switchMap, debounceTime, tap } = rxjs.operators;
    if (searchEle) {
        fromEvent(searchEle, 'keyup')
            .pipe(
                map((ele: any) => ele.target.value),
                filter((ele: string) => ele.length > 2),
                debounceTime(1200),
                tap(() => cleanBooks()),
                switchMap((ele: string) => getBooks(ele))
            )

            .subscribe((book: Book) => displayBook(book));

    }

}

function searchButtonClicked() {
    const books: any = document.querySelector('#search');
    if (books) {
        getBooks(books.value)
            .subscribe((book: Book) => displayBook(book))
    }
}

searckBooks();