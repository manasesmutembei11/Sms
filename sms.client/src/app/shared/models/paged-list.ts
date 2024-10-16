

export interface MetaData {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
    hasPrevious: boolean;
    hasNext: boolean;
}

export interface PagedList<T> {
    data: T[];
    metaData: MetaData;
}