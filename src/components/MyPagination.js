import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const MyPagination = (props) => {

    let {total=0, choose=0} = props

    let items = []
    let local_total = 6
    let index_to = 0
    if (choose < local_total){
        index_to = 0
    }else if (choose > total - local_total) {
        index_to = total - local_total
    } else { 
        index_to = choose - parseInt(local_total / 2)
    }


    for (let i = 0; i < local_total; i++) {
        let ind = index_to + i
        items.push(
            <PaginationItem key={ind} active={ind==choose ? true: false  }>
                <PaginationLink href="#" onClick={() => props.change(ind)}>{ind}</PaginationLink>
            </PaginationItem>
        )
    }

    return (
        <Pagination size="md" aria-label="Page navigation example" listClassName='justify-content-center'>
            <PaginationItem>
                <PaginationLink first href="#" onClick={() => props.change(0)} />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink previous href="#" onClick={() => props.change(choose > 0 ? choose-1: 0)} />
            </PaginationItem>
            {
                items
            }
            <PaginationItem>
                <PaginationLink next href="#" onClick={() => props.change(choose < total - 1 ? choose + 1 : total-1)} />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink last href="#" onClick={() => props.change(total-1)} />
            </PaginationItem>
        </Pagination>
    );
}

export default MyPagination;