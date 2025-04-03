# Time Complexity

**Asymptotic notation?** There's three kinds.

- **Big O**: upper bound, worst-case performance
- **Omega notation**: lower bound, best-case performance
- **Theta notation**: average of upper and lower bound

Big O is the most useful notation to programmers because awareness of the worst case timing is essential for _scalability_.

The [Big O complexity chart](https://www.bigocheatsheet.com/) of common search and sort algorithms.

# Space Complexity

Total amount of working memory the algorithm needs. Consideration of both:

- Algorithm input
- **Auxiliary space:** temporary variables during execution.

Less consideration due to cheapness of RAM compared to value of time. But RAM is fixed, and longer execution can just be waited for.
